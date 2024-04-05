function validateParams(params) {
    if (!params.x || !params.y) {
      throw new Error('Missing parameters x and/or y');
    }
  }
  
  function validateBigSumParams(params) {
    if (!params.n) {
      throw new Error('Missing parameter n');
    }
  }
  
  module.exports = { validateParams, validateBigSumParams };
  