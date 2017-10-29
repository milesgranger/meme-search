from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/')
def index():
    return jsonify({'data': request.args.to_dict()})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
