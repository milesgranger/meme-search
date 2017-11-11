import os
import time
from flask import Flask, jsonify, request
from elasticsearch import Elasticsearch

from server.api_v1.views import api_v1_blueprint
from server.dev_setup import SetupElasticSearch

es = Elasticsearch(hosts=[os.environ['ELASTICSEARCH_HOST']])

app = Flask(__name__)

app.register_blueprint(api_v1_blueprint)


@app.route('/')
def index():
    return jsonify({'data': request.args.to_dict()})


if __name__ == '__main__':
    time.sleep(6)
    SetupElasticSearch.setup(es=es)
    app.run(host='0.0.0.0', port=5556, debug=True)
