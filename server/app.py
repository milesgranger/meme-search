from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return jsonify({'data': 'hello from server!'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
