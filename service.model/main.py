import os
import collections
import numpy as np
import json
from flask import Flask, request
from flask_restful import Resource, Api
from model.model import CovidModel
from flask_cors import CORS
from data.cases import Crawler


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
                r0_params = [2.67, 1.675, 1.40, 1.05, 0.32]
            # print(r0_params)
            if 'model_vals' in request.args:
                model_vals = list(map(float, request.args['model_vals'].split(",")))
            else:
                model_vals = [0.0666, 0.02, 0.5, 0, 0.0097, 0.0166, 1.00, 1.00]
            # print(model_vals)
            if 'resource_vals' in request.args:
                resource_values = list(map(float, request.args['resource_vals'].split(",")))
            else:
                resource_values = [0, 0.4, 0.8, 0, 0.4, 0.8, 5.4, 0, 0.4, 0.8, 3.0]
            # print(resource_values)
            if 'sim_len' in request.args:
                sim_len_user = int(request.args['sim_len'])
            else:
                sim_len_user = 182
            # print(sim_len_user)
            if 'sim_interval' in request.args:
                sim_interval = int(request.args['sim_interval'])
            else:
                sim_interval = 4
            # print(sim_interval)

            model = CovidModel(intervention_len, r0_params, model_vals, resource_values, sim_len_user, sim_interval)
            # print('Model created')

            # Getting state information and cases
            # Right now hard coded
            state_info = None
            state_cases = None
            state_info_template = collections.namedtuple('state_info', 'pop pub_hbeds priv_hbeds icu_beds vents weekly_hosps')
            if 'state' in request.args:
                state = request.args['state']
                if state == "vic":
                    state_info = state_info_template(pop=6229900, pub_hbeds=14820, priv_hbeds=8367, icu_beds=476,
                                        vents=int(resource_values[6]*6229900/100000), weekly_hosps=46000)

                    df = Crawler('Australia','Victoria').query()
                    state_cases = crawler.filter_data(df, '2020-03-10', interval=4)
                elif state == "nsw":
                    state_info = state_info_template(pop=8118000, pub_hbeds=21253, priv_hbeds=8491, icu_beds=874,
                                        vents=int(resource_values[6]*8118000/100000), weekly_hosps=58921)
                    state_cases = np.array([55, 4, 13, 14, 20, 22, 37, 39, 57, 40, 46, 83, 97, 136])
                else:
                    return 'Unrecognized or unsupported state', 400
            if 'state_info' in request.args:
                state_info_input = list(map(int, request.args['state_info'].split(",")))
                if len(state_info_input) != 5:
                    return "State information input has to be of size 5", 400
                pop, pub_hbeds, priv_hbeds, icu_beds, weekly_hosps = state_info_input
                state_info = state_info_template(pop=pop, pub_hbeds=pub_hbeds, priv_hbeds=priv_hbeds,
                            icu_beds=icu_beds, vents=int(resource_values[6]*pop/100000), weekly_hosps=weekly_hosps)
            if state_info is None:
                return "Need either state or state info input", 400
            if 'state_cases' in request.args:
                state_cases = np.array(list(map(int, request.args['state_info'].split(","))))
            if state_cases is None:
                return "Need either state or state cases input", 400

            results, data = model.run_simulate(state_info, state_cases)
            return json.dumps({'results': results, 'data': data})

        except Exception as e:
            print(e)
            return 'Error', 400

api.add_resource(Model, '/')

if __name__ == '__main__':
    app.config.from_object('config.default')
    app.run(host='0.0.0.0', port=app.config['PORT'])
