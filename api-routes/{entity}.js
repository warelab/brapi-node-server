var util = require('../util.js');
var db = require('../neo4jApi.js');

// GET /brapi/v1/{entity}?foo=bar
// uses api.searchEntity() and api.getSearchResults()

module.exports = {
  // parameters for all operations in this path
  parameters: [
    {
      name: 'entity',
      in: 'path',
      type: 'string',
      required: true,
      description: 'entity type'
    }
  ],
  // method handlers may just be the method handler...
  get: get
};

function get(req, res) {
  console.log(req.params);
  var entityType = req.params.entity;
  delete req.params.entity;
  var paginationParams = {};
  db.searchEntity(entityType, req.params)
    .then(searchResponse => util.handleGetSearchResultResponse(searchResponse, paginationParams));
}

get.apiDoc = {
  description: 'get an entity (with filters)',
  operationId: 'filterEntity',
  responses: {
    200: {
      description: 'filtered set of entities',
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
