# -*- coding: utf-8 -*-
from flask import current_app, jsonify, request, abort
from flask.blueprints import Blueprint
from flask.views import MethodView
from werkzeug.datastructures import FileStorage

from server.settings import ES
from server.api_v1.elasticsearch import MemeSearch


api_v1_blueprint = Blueprint(__name__, import_name='api_v1')


class MemeSearchAPI(MethodView):
    """
    Interface to the MemeSearch API - flask.views.MethodView
    """

    methods = ['GET', 'POST']

    def post(self):

        # check that 'meme' is one of the file being passed
        if 'meme' not in request.files:
            abort(400, 'Invalid post data given')

        # Check that it came with tags
        tags = request.args.to_dict()
        current_app.logger.info('Got tags: {}'.format(tags))

        # Get the file
        file = request.files['meme']

        current_app.logger.info('File type: {}'.format(type(file)))

        # Ensure it is one of the supported file types.
        allowed_file_types = ['jpg', 'png', 'jpeg']
        if not any([file.filename.lower().endswith(file_type) for file_type in allowed_file_types]):
            abort(415, 'Can only accept {} image types.'.format(', '.join(allowed_file_types)))

        file.save('/workdir/{}'.format(file.filename))
        current_app.logger.info('Saved image {}'.format(file.filename))
        return jsonify({'status': 'image_saved'})

    def save_meme(self, file, tags: str):
        pass


    def get(self):
        """
        Process a standard search get request
        """
        query = request.args.get('query')
        meme_icons = MemeSearch(es=ES).get_memes(index='memes', query=query, type='raw-uploads')
        return jsonify(meme_icons)


api_v1_blueprint.add_url_rule(rule='/api-v1/', view_func=MemeSearchAPI.as_view('memesearchv1'))
