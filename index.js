/* eslint-env node */
'use strict';

var Funnel = require('broccoli-funnel');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-test-with-data',
  included(app) {
    this._super.included.apply(this, arguments);
    this.env = app.env;
    if (!this.env) { return; }

    let filterFilename = this._findFilename()

    if (this._stripDataTestAttrs && filterFilename) {
      app.options = app.options || {};
      app.options.babel = app.options.babel || {};
      app.options.babel.plugins = app.options.babel.plugins || [];
      this.ui.writeLine('Stripping all data test attributes');
      app.options.babel.plugins.push(require(filterFilename));
    }
  },

  treeForAddon: function() {
    var tree = this._super.treeForAddon.apply(this, arguments);

    return this._stripDataTestInitializers(tree);
  },

  treeForApp: function(tree) {
    if (this._super.treeForApp) {
      tree = this._super.treeForApp.apply(this, arguments);
    }

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

  _findFilename() {
    let checker = new VersionChecker(this.parent).for('ember-cli-babel', 'npm');
    let basename = './filter-data-test-attributes-babel-'

    if (checker.satisfies('^5.0.0')) {
      return basename + '5'
    }
    if (checker.satisfies('^6.0.0-beta.1')) {
      return basename + '6'
    }
  },

  _stripDataTestInitializers: function(tree) {
    if (this._stripDataTestAttrs) {
      tree = new Funnel(tree, { exclude: [ /add-data-test-to-view/ ] });
    }
    return tree;
  }
};
