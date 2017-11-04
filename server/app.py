from flask import Flask, jsonify, request

from server.api_v1.views import api_v1_blueprint

app = Flask(__name__)

app.register_blueprint(api_v1_blueprint)


@app.route('/')
def index():
    return jsonify({'data': request.args.to_dict()})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5556, debug=True)
