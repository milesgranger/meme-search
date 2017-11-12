from elasticsearch import Elasticsearch


class MemeSearch:

    def __init__(self, es: Elasticsearch):
        """
        Initialize with Elasticsearch client instance
        """
        self.es = es

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
