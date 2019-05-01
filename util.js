function handleGetSearchResultResponse(resultResponse, paginationParams) {
  // check for error in resultResponse
  res.status(200).json({
    metadata:{
      pagination: {
        currentPage: paginationParams.currentPage,
        pageSize: paginationParams.pageSize,
        totalCount: resultResponse.totalCount,
        totalPages: Math.ceil(resultResponse.totalCount/paginationParams.pageSize)
      }
    },
    result: {
      data: resultResponse.records
    }
  })
}

module.exports.handleGetSearchResultResponse = handleGetSearchResultResponse;