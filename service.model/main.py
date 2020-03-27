import os
import collections
import numpy as np
import json
from flask import Flask, request
from flask_restful import Resource, Api
from model.model import CovidModel
from flask_cors import CORS
from data.cases import Crawler
import json
from data.hospital import Hospital
import time
import logging
import sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if logging.root.handlers == []:
    ch = logging.StreamHandler(sys.stdout)
    ch.setFormatter(logging.Formatter('%(asctime)s %(levelname)s %(message)s'))
    logger.addHandler(ch)


# Server setup
app = Flask(__name__)
CORS(app)
api = Api(app)

class Model(Resource):
    def get(self):
        try:
            if 'int_len' in request.args:
                intervention_len = list(map(int, request.args['int_len'].split(",")))
                if len(intervention_len) != 5:
                    return "Intervention length has to be of size 5", 400
            else:
                return 'Need intervention lengths', 400
            # print(intervention_len)
            if 'r0' in request.args:
                r0_params = list(map(float, request.args['r0'].split(",")))
            else:
                return 'Need R0 parameters', 400
            # print(r0_params)
            if 'model_vals' in request.args:
                model_vals = list(map(lambda x : float(x) / 100, request.args['model_vals'].split(",")))
                if len(model_vals) != 8:
                    return "Model parameters array has to be of size 8, with the following values: 'hosp_admit','icu_admit','icu_vent','vent_rates','cfr_normal','cfr_overload','mort_icublocked','mort_ventblocked'", 400
            else:
                return 'Need model parameters.', 400
            # print(model_vals)
            if 'resource_vals' in request.args:
                resource_values = list(map(lambda x: float(x) / 100, request.args['resource_vals'].split(",")))
                if len(resource_values) != 10:
                    return "Resource values array has to be of size 10, with the following values: 'hbed','hbed_util','surge_hbed_util','icubed','icubed_util','surge_icubed_util','vent', 'vent_util','surge_vent_util','surge_vent_capac'", 400
                hbeds = int(resource_values[0] * 100)
                icu_beds = int(resource_values[3] * 100)
                vents = int(resource_values[6] * 100)
                resource_values[0] = hbeds
                resource_values[3] = icu_beds
                resource_values[6] = vents
            else:
                return 'Need parameters for resources.', 400
            # print(resource_values)

            model = CovidModel(intervention_len, r0_params, model_vals, resource_values)
            # print('Model created')

            # Getting state information and cases
            state_info_template = collections.namedtuple('state_info', 'pop hbeds icu_beds vents weekly_hosps')

            if 'state_info' in request.args:
                state_info_input = list(map(int, request.args['state_info'].split(",")))
                if len(state_info_input) != 2:
                    return "State information input has to be of size 2, containing: 'population','weekly_hospitalizations'", 400
                pop, weekly_hosps = state_info_input
                state_info = state_info_template(pop=pop, hbeds=hbeds,
                            icu_beds=icu_beds, vents=vents, weekly_hosps=weekly_hosps)
            else:
                return "Need state info.", 400

            if 'state_cases' in request.args:
                state_cases = np.array(list(map(int, request.args['state_cases'].split(","))))
                print(state_cases)
                if state_cases.size != 13:
                    return "Number of cases should be size 13. First value should be total cases from before 12 days ago. Remaining values are the daily cases since.", 400
            else:
                return "Need state cases.", 400

            logger.info('running simulator')
            start_time = time.time()
            results, data = model.run_simulate(state_info, state_cases)
            end_time = time.time()
            execution_time = end_time-start_time
            logger.info('simulation runtime: %f',execution_time)

            return json.dumps({'results': results, 'data': data})

        except Exception as e:
            print(e)
            return 'Error', 400

class StateInfo(Resource):
    def get(self):
        try:
            if 'country' in request.args:
                query_code = request.args['country'].replace("_", " ")
            else:
                return "Need country arg.", 400
            if 'state' in request.args:
                query_code += ":" + request.args['state'].replace("_", " ")
            hospital_loader = Hospital()
            hospital_data = hospital_loader.query(query_code)
            return json.dumps(hospital_data)

        except Exception as e:
            print(e)
            return 'Error', 400

class StateCases(Resource):
    def get(self):
        try:
            if 'country' in request.args:
                country = request.args['country'].replace("_", " ")
            else:
                return "Need country arg.", 400
            if 'start_date' in request.args:
                start_date = request.args['start_date']
            else:
                return "Need start date.", 400
            if 'state' in request.args:
                state = request.args['state'].replace("_", " ")
            else:
                state = None
            if 'interval' in request.args:
                interval = request.args['interval']
            else:
                interval = 1

            online_data = True
            if online_data:
                crawler = Crawler()
                df = crawler.query_single(country=country, state=state)
                state_cases = crawler.periodic_dataset(df,start_date, interval=interval)['cases'].values
            else:
                crawler = Crawler()
                df = crawler.import_json('data/cases.json', import_type='dataframe')
                df = crawler.filter_dataset(df,country, state)
                state_cases = crawler.periodic_dataset(df,start_date, interval=interval)['cases'].values

            return json.dumps({'cases': state_cases.tolist()})

        except Exception as e:
            print(e)
            return 'Error', 400

api.add_resource(Model, '/')
api.add_resource(StateInfo, '/info')
api.add_resource(StateCases, '/case')

if __name__ == '__main__':
    app.config.from_object('config.default')
    app.run(host='0.0.0.0', port=app.config['PORT'])
