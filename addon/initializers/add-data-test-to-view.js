import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default {
  name: 'add-data-test-to-view',
  initialize(app) {
    const ENV = app.resolveRegistration('config:environment');
    const {
      environment,
      'ember-test-with-data': addonOptions = {}
    } = ENV;
    const {
      autoTag = true,
      hiddenEnvironments = ['production']
    } = addonOptions;

    if (hiddenEnvironments.indexOf(environment) !== -1) { return; }

    Component.reopen({
      attributeBindings: ['dataTestId:data-test-id']
    });

    if (autoTag) {
      Component.reopen({
        dataTestId: computed(function() {
          const suffix = this.get('dataTestSuffix');
          let baseId = (this._debugContainerKey || '')
            .replace(/.*component:/g, '')
            .replace(/\//g, '-')
            .replace(/^-/, '');
          return suffix ? `${baseId}-${suffix}` : baseId;
        })
      });
    }
  }
};
