var db = require('../../../neo4jApi.js');
var util = require('../../../util.js');
module.exports = {
  // parameters for all operations in this path
  parameters: [
    {
      name: 'entity',
      in: 'path',
      type: 'string',
      required: true,
      description: 'entity type'
    },
    {
      name: 'searchResultDbId',
      in: 'path',
      type: 'string',
      required: true,
      description: 'search results db id'
    }
  ],
  // method handlers may just be the method handler...
  get: get
};

function get(req, res) {
  var paginationParams = req.params; // pick the pagination params?
  db.getSearchResult(req.params.searchResultDbId, paginationParams)
    .then(searchResponse => utill.handleGetSearchResultResponse(searchResponse, paginationParams));
}

get.apiDoc = {
  description: 'did a search',
  operationId: 'searched',
  responses: {
    200: {
      description: 'Searched',
      schema: {
        $ref: '#/definitions/searchResultResponse'
      }
    },

    default: {
      description: 'Unexpected error',
      schema: {
        $ref: '#/definitions/Error'
      }
    }
  }
};
