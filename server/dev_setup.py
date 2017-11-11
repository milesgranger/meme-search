# -*- coding: utf-8 -*-
import random
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk


class SetupElasticSearch:
    """
    For development purposes:
    Fill elasticsearch instance with memes

    memes held at SetupElasticSearch.memes

    Use:
    >>> SetupElasticSearch.setup(es=Elasticsearch(hosts=[...]))
    """
    memes = [
        {'meme-id': 'meme-{}'.format(random.randint(0, 10000)),
         'meme-url': 'https://media1.popsugar-assets.com/files/thumbor/Jd4nQ83myp6U6gWLzHV8aCkp6Lo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2015/07/30/615/n/1922153/6f32db66ead6ded2_Screen_Shot_2015-07-29_at_5.21.10_PM/i/Funny-Beauty-Memes.png',
         'meme-tags': 'sad, horrible, too bad'
         },
        {'meme-id': 'meme-{}'.format(random.randint(0, 10000)),
         'meme-url': 'http://static.damnlol.com/pics/61/fd0af9ffb5bf1f13883102e3140e59b0.jpg',
         'meme-tags': 'bad makeup, makeup fail, indian'
         },
        {'meme-id': 'meme-{}'.format(random.randint(0, 10000)),
         'meme-url': 'https://cdn.pastemagazine.com/www/system/images/photo_albums/harry-potter/large/harry-potter-meme-86.jpg',
         'meme-tags': 'harry potter, crazy'
         },
        {'meme-id': 'meme-{}'.format(random.randint(0, 10000)),
         'meme-url': 'https://www.writeraccess.com/wp-content/uploads/2014/11/blog-meme.jpg',
         'meme-tags': 'crazy, memes'
         },
    ]

    @classmethod
    def setup(cls, es: Elasticsearch):
        """
        Load some fake images into elastic search
        """
        es_index_name = 'memes'
        docs = []
        for meme in cls().memes:
            doc = {
                '_id': meme.get('meme-id'),
                '_type': 'document',
                '_index': es_index_name,
                '_op_type': 'create',
                '_source': meme
            }
            docs.append(doc)

        if es.indices.exists(es_index_name):
            es.indices.delete(index=es_index_name)
        es.indices.create(index=es_index_name)
        bulk(es, docs)

        es.indices.refresh(index=es_index_name)

