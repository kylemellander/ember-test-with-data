/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-test-with-data',
  included: function(app) {
    var registry = app.registry;
    var options = app.options || {};
    this.env = app.env;

    var configPath = options.configPath;


    // NOTE: For ember-cli >= 2.6.0-beta.3, project.configPath() returns absolute path
    // while older ember-cli versions return path relative to project root
    if (!path.isAbsolute(configPath)) {
      configPath = path.join(app.project.root, configPath);
    }

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

  treeForAddon: function() {
    var tree = this._super.treeForAddon.apply(this, arguments);
    var hiddenEnvironments = this.hiddenEnvironments || ['production'];
    if (hiddenEnvironments.indexOf(this.env) !== -1) {
      this.ui.writeLine('Stripping all data test attributes');
      tree = new Funnel(tree, { exclude: [ /add-data-test-to-view/ ] });
    }
    return tree;
  }
};
