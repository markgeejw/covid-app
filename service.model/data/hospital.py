import json
from pprint import pprint

class Hospital:
    def __init__(self):
        self.filepath = './data/hospital.json'


    def load_data(self,filepath):
        with open(filepath) as f:
            return json.load(f)

    def query(self,region):
        data = self.load_data(self.filepath)
        return data[region]

if __name__ == '__main__':

    pprint(Hospital().query(region='Singapore'))
