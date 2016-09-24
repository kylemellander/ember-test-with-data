/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-test-with-data',
  included(app) {
    var registry = app.registry;
    var options = app.options || {};
    this.env = app.env;
    var configPath = options.configPath;
    if (!this.env || !configPath) { return; }

    var config = require(configPath)(this.env) || {};
    var addonSettings = config['ember-test-with-data'] || {};
    this.hiddenEnvironments = addonSettings['hiddenEnvironments'] || ['production'];

    if (this.hiddenEnvironments.indexOf(this.env) !== -1) {
      var FilterDataTestAttributesTransform = require('./filter-data-test-attributes');

      registry.add('htmlbars-ast-plugin', {
        name: 'filter-data-test-attributes',
        plugin: FilterDataTestAttributesTransform,
        baseDir: function() { return app.project.root; }
      });
    }
  },

  preprocessTree(type, tree) {
    if (type === 'js' && this.hiddenEnvironments.indexOf(this.env) !== -1) {
      this.ui.writeLine('Stripping all data test attributes');
      tree = new Funnel(tree, { exclude: [ /add-data-test-to-view/ ] });
    }
    return tree;
  }
};
