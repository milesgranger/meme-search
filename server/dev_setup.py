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
        {'meme_id': 'meme1.jpg',
         'meme_tags': 'tag, hilarious, oh no, crazy'
         },
        {'meme_id': 'meme2.jpg',
         'meme_tags': 'tag, jpg, funny, wtf'
         },
        {'meme_id': 'meme3.jpg',
         'meme_tags': 'tag, wtf, why me, oh no'
         },
        {'meme_id': 'meme4.jpg',
         'meme_tags': 'tag, hilarious, do not mess with me'
         },
        {'meme_id': 'meme5.jpg',
         'meme_tags': 'tag, jpg funny hippo'
         },
        {'meme_id': 'meme6.jpg',
         'meme_tags': 'tag, jpg, fire me fail'
         },
        {'meme_id': 'meme7.jpg',
         'meme_tags': 'tag, jpg failblog crazy times'
         },
        {'meme_id': 'meme8.jpg',
         'meme_tags': 'tag, jpg failure rate make money'
         },
        {'meme_id': 'meme9.jpg',
         'meme_tags': 'tag, jpg on my way waiting on you'
         },
        {'meme_id': 'meme10.jpg',
         'meme_tags': 'tag, jpg great stuff hilarious'
         },
        {'meme_id': 'meme11.png',
         'meme_tags': 'tag, png crying animated'
         },
        {'meme_id': 'meme12.png',
         'meme_tags': 'tag, png why me whoa is me'
         },
        {'meme_id': 'meme13.jpg',
         'meme_tags': 'tag, jpg animated cartoon'
         },
        {'meme_id': 'meme14.png',
         'meme_tags': 'tag, png cry me a river hilarious'
         },
        {'meme_id': 'meme15.png',
         'meme_tags': 'tag, png failure rate is high'
         },

    ]

    @classmethod
    def setup(cls, es: Elasticsearch, index_name: str='memes'):
        """
        Load some fake images into elastic search
        """
        docs = []  # type: list
        for meme in cls().memes:
            doc = {
                '_id': meme.get('meme_id'),
                '_type': 'document',
                '_index': index_name,
                '_op_type': 'create',
                '_source': meme
            }
            docs.append(doc)

        if es.indices.exists(index_name):
            es.indices.delete(index=index_name)
        es.indices.create(index=index_name)
        bulk(es, docs)

        es.indices.refresh(index=index_name)

