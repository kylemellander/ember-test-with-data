import Ember from 'ember';

const { Component } = Ember;

export default {
  name: 'add-data-test-to-view',
  initialize(app) {
    const ENV = app.resolveRegistration('config:environment');
    const {
      environment,
      'ember-test-with-data': addonOptions = {}
    } = ENV;
    const {
      hiddenEnvironments = ['production']
    } = addonOptions;

    if (hiddenEnvironments.indexOf(environment) !== -1) { return; }

    Component.reopen({
      attributeBindings: ['data-test-id', 'data-test-class']
    });
  }
};
