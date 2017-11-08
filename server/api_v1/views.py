# -*- coding: utf-8 -*-
from flask import current_app, jsonify, request, abort
from flask.blueprints import Blueprint
from flask.views import MethodView


api_v1_blueprint = Blueprint(__name__, import_name='api_v1')


class MemeSearchAPI(MethodView):
    """
    Interface to the MemeSearch API
    """

    methods = ['GET', 'POST']

    def post(self):

        # check if
        if 'meme' not in request.files:
            abort(500)

        file = request.files['meme']
        file.save('/workdir/{}'.format(file.filename))

        return 'server ack upload'

    def get(self):
        """
        Process a standard search get request
        """
        icons = [
            {
                'name': 'image1',
                'location': "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
            },
            {
                'name': 'image2',
                'location': "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
            },
            {
                'name': 'image3',
                'location': "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
            },
            {
                'name': 'image4',
                'location': "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
            }
        ]

        return jsonify(icons)


api_v1_blueprint.add_url_rule(rule='/api-v1/', view_func=MemeSearchAPI.as_view('memesearchv1'))
