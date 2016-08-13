/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-test-with-data',
  included(app) {
    var registry = app.registry;
    var options = app.options || {};
    var env = app.env;
    var configPath = options.configPath;
    if (!env || !configPath) { return; }

    var config = require(configPath)(env) || {};
    var addonSettings = config['ember-test-with-data'] || {};
    var hiddenEnvironments = addonSettings['hiddenEnvironments'] || ['production'];

    if (hiddenEnvironments.indexOf(env) !== -1) {
      var FilterDataTestAttributesTransform = require('./filter-data-test-attributes');

      registry.add('htmlbars-ast-plugin', {
        name: 'filter-data-test-attributes',
        plugin: FilterDataTestAttributesTransform,
        baseDir: function() { return app.project.root; }
      });
    }
  }
};
