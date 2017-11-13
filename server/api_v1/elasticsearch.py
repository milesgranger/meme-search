from elasticsearch import Elasticsearch


class MemeSearch:

    def __init__(self, es: Elasticsearch):
        """
        Initialize with Elasticsearch client instance
        """
        self.es = es

    @staticmethod
    def generate_ngrams(tag: str) -> str:
        """
        Generate ngrams from a tag
        'my tag' -> 'm my my t my ta my tag'

        Parameters
        ----------
        tag:    str

        Returns
        -------
        ngram: str
        """
        return ' '.join([tag[0:i] for i in range(1, len(tag) + 1)])

    def search_tags(self, index: str, tag: str):
        """
        Return list of matching tags given current search tag
        """
        query = {
            "query": {
                "bool": {
                    "should": {"match": {"tag": tag.lower()}},
                }
            }
        }
        results = self.es.search(index=index,
                                 doc_type='document',
                                 body=query)

        results = [{'tag': doc['_id'],
                    'count': doc['_source']['count']}
                   for doc in results
                   ]
        return results

    def create_or_update_tag(self, index: str, tag: str):
        """
        Either create or update a tag count
        +1 is added to a tag if it exists otherwise it is created
        """
        tag = tag.lower()

        # Update existing tag
        if self.es.exists(index=index, doc_type='document', id=tag):
            doc = self.es.get(index=index, id=tag).get('_source')
            doc['count'] = doc['count'] + 1
            self.es.update(index=index, doc_type='document', id=tag, body={'doc': doc})

        # Create a new tag
        else:
            doc = {'tag': self.generate_ngrams(tag=tag),
                   'count': 0}
            self.es.create(index=index, doc_type='document', id=tag, body=doc)

        self.es.indices.refresh(index='tags')

    def get_memes(self, index: str, query: str, type: str):
        """
        Return a list of dicts for related memes given query string.

        Parameters
        ----------
        query:  str - query string
        index:  str - name of elasticsearch index
        type:   str - type of endpoint to make urls for. raw-uploads, meme-icons, memes

        Returns
        -------
        results:    list - either empty list if no hits, or list of dicts with keys 'meme_url', 'meme_id', 'meme_tags'
        """
        results = self.es.search(index=index,
                                 body={
                                     'query': {
                                         'match': {
                                             'meme_tags': query
                                         }
                                     }
                                 })

        results = [rec['_source'] for rec in results['hits']['hits']]

        #Make the url endpoints
        for rec in results:
            rec['meme_url'] = 'https://s3.amazonaws.com/meme-search/{type}/{meme_id}'.format(type=type,
                                                                                             meme_id=rec['meme_id'])

        return results
