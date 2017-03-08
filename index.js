/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-test-with-data',
  included: function(app) {
    var registry = app.registry;
    this.env = app.env;
    if (!this.env) { return; }

    if (this._stripDataTestAttrs) {
      var FilterDataTestAttributesTransform = require('./filter-data-test-attributes');

      registry.add('htmlbars-ast-plugin', {
        name: 'filter-data-test-attributes',
        plugin: FilterDataTestAttributesTransform,
        baseDir: function() { return app.project.root; }
      });
    }
  },

  treeForAddon: function() {
    var tree = this._super.treeForAddon.apply(this, arguments);

    return this._stripDataTestInitializers(tree);
  },

  treeForApp: function() {
    var tree = this._super.treeForAddon.apply(this, arguments);

    return this._stripDataTestInitializers(tree);
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      var app = registry.app || {}
      var options = registry.app.options || {};
      var addonOptions = options['ember-test-with-data'] ||
        { hidden: app.env === 'production' };
      this._stripDataTestAttrs = addonOptions.hidden
    }
  },

  _stripDataTestInitializers: function(tree) {
    if (this._stripDataTestAttrs) {
      this.ui.writeLine('Stripping all data test attributes');
      tree = new Funnel(tree, { exclude: [ /add-data-test-to-view/ ] });
    }
    return tree;
  }
};
