import Ember from 'ember';

const { Component } = Ember;

export default {
  name: 'add-data-test-to-view',
  initialize(app) {
    const ENV = app.resolveRegistration('config:environment');
    const addonOptions = ENV['ember-test-with-data'] || {};
    const hiddenENVs = addonOptions.hiddenEnvironments || ['production'];

    if (hiddenENVs.includes(ENV.environment)) { return; }

    Component.reopen({
      attributeBindings: ['data-test-id', 'data-test-class']
    });
  }
};
