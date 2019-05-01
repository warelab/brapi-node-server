var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "abcde"));

function makeQuery(entityType, entityParams) {
  return `MATCH (:${entityType} ${entityParams})`
}

function searchEntity(entityType, entityParams) {
  var session = driver.session();
  var cypherQuery = makeQuery(entityType, entityParams);
  return session
    .run(
      `${cypherQuery} RETURN count(*)`
    )
    .then(result => {
      session.close();
      // put cypher query and totalCount into key-value store
      // key is searchResultDbId
      // add searchResultDbId to result object
      return result;
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

function getSearchResult(searchResultDbId, paginationParams) {
  // get cypher query and totalCount from key-value store
  var session = driver.session();
  return session
    .run(`${cypherQuery} ${paginationParams} return entity`)
    .then(result => {
      session.close();
      // include totalCount in the response
      return result.records;
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

module.exports.searchEntity = searchEntity;
module.exports.getSearchResult = getSearchResult;