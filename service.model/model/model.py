# TO DO:
# - Web scraping 
# - Connect user inputs and outputs

import numpy as np
from datetime import date
import datetime
import collections

def round_down(num, multiple):
    return num - (num % multiple)

model_keys = ['hosp_admit', 'icu_admit', 'icu_vent', 'vent_rates', 'cfr_normal', 'cfr_overload', 'mort_icublocked', 'mort_ventblocked']
resource_keys = ['hbed', 'hbed_util', 'surge_hbed_util', 'icubed', 'icubed_util', 
										'surge_icubed_util', 'vent_per_100000', 'vent', 'vent_util', 
										'surge_vent_util', 'surge_vent_capac']

class CovidModel(object):
	def __init__(self, 
				intervention_len,
				R0_params, 
				model_values,
				resource_values,
				sim_len_user=188, sim_interval=4):
		# essential model params
		self.sim_len_user = sim_len_user
		self.sim_interval = sim_interval
		self.sim_length = round_down(sim_len_user, sim_interval)
		self.epochs = int(self.sim_length / sim_interval)

		# user inputs
		self.intervention_len = intervention_len
		self.R0_params = R0_params
		self.model_values = model_values
		self.resource_values = resource_values # 0 values dep on state

	def init_arrays(self, state_info):
		# create date and day vectors 
		start_date = date.today()
		day_vector = np.array(np.arange(0, self.sim_length, self.sim_interval))
		date_vector = np.arange(start_date, start_date + datetime.timedelta(self.sim_length), 
														self.sim_interval, dtype='datetime64[D]')
		# create R0 vector based on user input 
		R0_vector = np.zeros(0)
		for i in range(len(self.intervention_len)):
			if (self.intervention_len[i] != 0):
				intervention_epochs = int(round((self.intervention_len[i] * 7)/self.sim_interval))
				R0_vector = np.concatenate((R0_vector, np.repeat(self.R0_params[i], intervention_epochs)))
		R0_vector = R0_vector[:self.epochs]
		if (sum(self.intervention_len) == 26):
			last_val = R0_vector[-1]
			R0_vector = np.concatenate((R0_vector, np.array([last_val, last_val])))
		elif (sum(self.intervention_len) < 26):
			R0_vector = np.concatenate((R0_vector, np.repeat(self.R0_params[2], self.epochs - len(R0_vector))))

		# update resource values based on state
		if (self.resource_values[0] == 0): # beds
			self.resource_values[0] = state_info.pub_hbeds + state_info.priv_hbeds
		if (self.resource_values[3] == 0): # ICU beds
			self.resource_values[3] = state_info.icu_beds
		if (self.resource_values[7] == 0): # ventilators
			self.resource_values[7] = self.resource_values[6]*state_info.pop/100000
		if (self.model_values[3] == 0): # ventilation rates 
			self.model_values[3] = self.model_values[1] * self.model_values[2]
		# create model and resource parameter dicts
		model_params = {}
		resource_params = {}
		for i in range(len(model_keys)):
			model_params[model_keys[i]] = self.model_values[i]
		for i in range(len(resource_keys)):
			resource_params[resource_keys[i]] = self.resource_values[i]
		return day_vector, date_vector, R0_vector, model_params, resource_params

	def init_results(self, results, R0, state_info, resource_params):
		results['total_weeks_action'] = sum(self.intervention_len)
		results['average_R0'] = np.mean(R0)
		results['hbed_normal'] = (state_info.pub_hbeds + state_info.priv_hbeds) * resource_params['hbed_util']
		results['hbed_surge'] = (state_info.pub_hbeds + state_info.priv_hbeds) * resource_params['surge_hbed_util']
		results['hosp_per_week'] = state_info.weekly_hosps
		results['icubed_normal'] = state_info.icu_beds * resource_params['icubed_util']
		results['icubed_surge'] = state_info.icu_beds * resource_params['surge_icubed_util']
		results['vent_normal'] = state_info.vents * resource_params['vent_util']
		results['vent_surge'] = state_info.vents * resource_params['surge_vent_util'] * resource_params['surge_vent_capac']


	def mortality(self, hbeds_req, icubeds_req, vents_req, infected, results, model_params):
		case_fatality_rate = model_params['cfr_normal']
		deaths = 0
		overload_deaths = 0
		if (hbeds_req > results['hbed_normal'] or 
					icubeds_req > results['icubed_normal'] or
					vents_req > results['vent_normal']):
				case_fatality_rate = model_params['cfr_overload']
				if (icubeds_req > results['icubed_normal']):
					deaths += icubeds_req - results['icubed_normal']
					overload_deaths += icubeds_req - results['icubed_normal']
				if (vents_req > results['vent_normal']):
					deaths += vents_req - results['icubed_normal']
					overload_deaths += vents_req - results['icubed_normal']
		deaths += case_fatality_rate * infected
		return deaths, overload_deaths

	def infection_simulation(self, state_info, state_cases, results, data, R0, model_params, resource_params, dates):
		# Note newly infected is epochs + 3 len (account for earlier cases)
		# Newly recovered and deaths operate on 3 epochs in the past 

		# susceptible and infected
		newly_infected = np.zeros(self.epochs + 3)
		newly_infected[3] = np.sum(state_cases[-self.sim_interval:])
		newly_infected[2] = np.sum(state_cases[-2*self.sim_interval:-self.sim_interval])
		newly_infected[1] = np.sum(state_cases[-3*self.sim_interval:-2*self.sim_interval])
		newly_infected[0] = np.sum(state_cases[:-3*self.sim_interval])
		old_cases = np.sum(newly_infected[0:3])

		susceptible_start = np.zeros(self.epochs)
		susceptible_end = np.zeros(self.epochs)
		currently_infected = np.zeros(self.epochs)

		susceptible_start[0] = state_info.pop - np.sum(state_cases)
		susceptible_end[0] = susceptible_start[0] - newly_infected[3]
		currently_infected[0] = np.sum(newly_infected[0:3])

		# hospitalised, ICU, ventilator, passed and recovered
		newly_hospitalised = np.zeros(self.epochs)
		hbeds_required = np.zeros(self.epochs)
		newly_icu = np.zeros(self.epochs)
		icubeds_required = np.zeros(self.epochs)
		true_icubeds = np.zeros(self.epochs)
		newly_vent = np.zeros(self.epochs)
		vents_required = np.zeros(self.epochs)
		true_vents = np.zeros(self.epochs)
		newly_passed = np.zeros(self.epochs)
		overload_passed = np.zeros(self.epochs)
		newly_recovered = np.zeros(self.epochs)

		# init all arrays 
		newly_hospitalised[0] = model_params['hosp_admit'] * newly_infected[3]
		hbeds_required[0] = newly_hospitalised[0]
		newly_icu[0] = model_params['icu_admit'] * newly_infected[3]
		icubeds_required[0] = newly_icu[0]
		true_icubeds[0] = min(results['icubed_surge'], icubeds_required[0])
		newly_vent[0] = model_params['vent_rates'] * newly_infected[3]
		vents_required[0] = newly_vent[0]
		true_vents[0] = min(results['vent_surge'], vents_required[0])
		newly_passed[0], overload_passed[0] = self.mortality(0, 0, 0, newly_infected[0], results, model_params)
		newly_recovered[0] = newly_infected[0] - newly_passed[0]

		# simulation
		for i in range(1, self.epochs):
			# susceptible and infected
			last_infected = newly_infected[2 + i]
			susceptible_start[i] = susceptible_end[i - 1]
			new_infections = int(last_infected * R0[i] * susceptible_start[i] / state_info.pop)
			newly_infected[3 + i] = max(new_infections, 0)
			susceptible_end[i] = susceptible_start[i] - newly_infected[3 + i]
			currently_infected[i] = np.sum(newly_infected[i:i+3])
			# hospital beds
			newly_hospitalised[i] = model_params['hosp_admit'] * newly_infected[3 + i]
			hbeds_required[i] = hbeds_required[i - 1] + newly_hospitalised[i]
			# ICU beds
			newly_icu[i] = model_params['icu_admit'] * newly_infected[3 + i]
			icubeds_required[i] = icubeds_required[i - 1] + newly_icu[i]
			true_icubeds[i] = min(results['icubed_surge'], icubeds_required[i])
			# ventilators 
			newly_vent[i] = model_params['vent_rates'] * newly_infected[3 + i]
			vents_required[i] = vents_required[i - 1] + newly_vent[i]
			true_vents[i] = min(results['vent_surge'], vents_required[i])
			# deaths - raised level if any surge required - depends on 3 epochs back
			if (i >= 3):
				newly_passed[i], overload_passed[i] = self.mortality(hbeds_required[i], icubeds_required[i], 
													vents_required[i], newly_infected[i], 
													results, model_params)
			else:
				newly_passed[i], overload_passed[i] = self.mortality(0, 0, 0, newly_infected[i], results, model_params)
			newly_recovered[i] = newly_infected[i] - newly_passed[i]
			
		# cumulative measures (does not account for cases in past -> only examines future)
		cumulative_infected = np.sum(newly_infected)
		cumulative_hospitalised = np.sum(newly_hospitalised)
		cumulative_needed_icu = np.sum(newly_icu)
		cumulative_received_icu = np.sum(true_icubeds)
		cumulative_needed_vents = np.sum(newly_vent)
		cumulative_received_vents = np.sum(true_vents)
		cumulative_passed = np.sum(newly_passed)
		cumulative_overload = np.sum(overload_passed)
		cumulative_recovered = np.sum(newly_recovered)

		# update newly_infected so as not to cause confusion with indices
		newly_infected = newly_infected[3:]

		# update data
		data['newly_infected'] = newly_infected.tolist()
		data['susceptible_start'] = susceptible_start.tolist()
		data['susceptible_end'] = susceptible_end.tolist()
		data['newly_hospitalised'] = newly_hospitalised.tolist()
		data['hbeds_required'] = hbeds_required.tolist()
		data['newly_icu'] = newly_icu.tolist()
		data['icubeds_required'] = icubeds_required.tolist()
		data['true_icubeds'] = true_icubeds.tolist()
		data['newly_vent'] = newly_vent.tolist()
		data['vents_required'] = vents_required.tolist()
		data['true_vents'] = true_vents.tolist()
		data['newly_passed'] = newly_passed.tolist()
		data['overload_passed'] = overload_passed.tolist()
		data['newly_recovered'] = newly_recovered.tolist()

		# update results 
		results['pandemic_end'] = bool((newly_infected[-1] == 0))
		results['total_infected'] = int(cumulative_infected)
		results['total_saved'] = int(state_info.pop - cumulative_infected)
		results['total_hospitalised'] = int(cumulative_hospitalised)
		results['total_needed_icu'] = int(cumulative_needed_icu)
		results['total_received_icu'] = int(cumulative_received_icu)
		results['total_needed_vent'] = int(cumulative_needed_vents)
		results['total_received_vent'] = int(cumulative_received_vents)
		results['total_deaths'] = int(cumulative_passed)
		results['total_deaths_overload'] = int(cumulative_overload)
		results['total_recovered'] = int(cumulative_recovered)
		results['percentage_infected'] = cumulative_infected / state_info.pop
		results['percentage_saved'] = (state_info.pop - cumulative_infected) / state_info.pop
		results['percentage_deaths_overload'] = cumulative_overload/cumulative_passed 

		# peak results 
		peak_index = np.argmax(newly_infected)
		results['pandemic_peak'] = np.datetime_as_string(dates[peak_index])
		results['daily_infection_rate_at_peak'] = newly_infected[peak_index] / self.sim_interval
		# hospital beds
		results['hbeds_req_peak'] = int(np.amax(hbeds_required))
		results['shortfall_hbeds_peak'] = int(max(np.amax(hbeds_required) - results['hbed_surge'], 0))
		results['hbeds_run_out_normal'] = np.datetime_as_string(dates[np.argmax(hbeds_required > results['hbed_normal'])])
		results['hbeds_run_out_surge'] = np.datetime_as_string(dates[np.argmax(hbeds_required > results['hbed_surge'])])
		results['days_hbed_out'] = int((hbeds_required > results['hbed_surge']).sum())
		# ICU beds
		results['icubeds_req_peak'] = int(np.amax(icubeds_required))
		results['shortfall_icubeds_peak'] = int(max(np.amax(icubeds_required) - results['icubed_surge'], 0))
		results['patients_missed_out_icubeds'] = max(cumulative_needed_icu - cumulative_received_icu, 0)
		results['icubeds_run_out_normal'] = np.datetime_as_string(dates[np.argmax(icubeds_required > results['icubed_normal'])])
		results['icubeds_run_out_surge'] = np.datetime_as_string(dates[np.argmax(icubeds_required > results['icubed_surge'])])
		results['days_icubed_out'] = int((icubeds_required > results['icubed_surge']).sum())
		# ventilators 
		results['vents_req_peak'] = int(np.amax(vents_required))
		results['shortfall_vents_peak'] = int(max(np.amax(vents_required) - results['vent_surge'], 0))
		results['patients_missed_out_ventilators'] = int(max(cumulative_needed_vents - cumulative_received_vents, 0))
		results['vents_run_out_normal'] = np.datetime_as_string(dates[np.argmax(vents_required > results['vent_normal'])])
		results['vents_run_out_surge'] = np.datetime_as_string(dates[np.argmax(vents_required > results['vent_surge'])])
		results['days_vents_out'] = int((vents_required > results['vent_surge']).sum())
		return peak_index

	def run_simulate(self, state_info, state_cases):
		days, dates, R0, model_params, resource_params = self.init_arrays(state_info)
		results = {}
		data = {}
		self.init_results(results, R0, state_info, resource_params)
		self.infection_simulation(state_info, state_cases, results, data, R0, model_params, resource_params, dates)
		return results, data