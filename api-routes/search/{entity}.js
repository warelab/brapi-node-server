var db = require('../../neo4jApi.js');

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
  post: post
};

function post(req, res) {
  console.log(req.params,req.body);
  db
  .searchEntity(req.params.entity, req.body)
  .then(searchResponse => {
    // check for error in searchResponse
    res.status(200).json({
      metadata:{},
      result: {
        searchResultDbId: searchResponse.searchResultDbId
      }
    })
  })
}

post.apiDoc = {
  description: 'do a search',
  operationId: 'search',
  responses: {
    200: {
      description: 'Searching',
      schema: {
        $ref: '#/definitions/searchRequestResponse'
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
