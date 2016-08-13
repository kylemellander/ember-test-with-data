/*jshint node:true*/
function FilterDataTestAttributesTransform() {
  this.syntax = null;
}

FilterDataTestAttributesTransform.prototype.transform = function(ast) {
  var walker = new this.syntax.Walker();
  walker.visit(ast, function(node) {
    if (node.type === 'ElementNode') {
      node.attributes = node.attributes.filter(function(attribute) {
        var name = attribute.name;
        return !(name === 'data-test-id' || name === 'data-test-class');
      });
    }
  });

  return ast;
};

module.exports = FilterDataTestAttributesTransform;
