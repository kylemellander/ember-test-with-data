/* eslint-env node */

function FilterDataTestAttributesTransform() {
  return {
    visitor: {
      Property(path) {
        if(/^data-test/.test(path.node.key.name)) {
          path.remove();
        }
      }
    }
  }
}

FilterDataTestAttributesTransform.baseDir = function() {
  return __dirname;
};

FilterDataTestAttributesTransform.cacheKey = function() {
  return 'ember-test-with-data.filter-data-test-attributes';
};


module.exports = FilterDataTestAttributesTransform;
