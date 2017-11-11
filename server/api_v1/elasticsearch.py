from elasticsearch import Elasticsearch


class MemeSearch:

    def __init__(self, es: Elasticsearch):
        """
        Initialize with Elasticsearch client instance
        """
        self.es = es

    def get_memes(self, index: str, query: str):
        """
        Return a list of dicts for related memes given query string.

        Parameters
        ----------
        query:  str - query string
        index:  str - name of elasticsearch index

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
        return results
