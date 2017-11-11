# -*- coding: utf-8 -*-
import os
from elasticsearch import Elasticsearch


ES = Elasticsearch(hosts=[os.environ['ELASTICSEARCH_HOST']])