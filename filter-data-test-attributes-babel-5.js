/* eslint-env node */

function FilterDataTestAttributesTransform(babel) {
  return new babel.Plugin('ember-test-with-data', {
    visitor: {
      Property(node) {
        if(/^data-test/.test(node.key.name)) {
          this.dangerouslyRemove();
        }
      }
    }
  });
}

FilterDataTestAttributesTransform.baseDir = function() {
  return __dirname;
};

FilterDataTestAttributesTransform.cacheKey = function() {
  return 'ember-test-with-data.filter-data-test-attributes';
};


module.exports = FilterDataTestAttributesTransform;
