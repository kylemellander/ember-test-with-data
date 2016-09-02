import Ember from 'ember';

const {
  Component,
  computed,
  String: {
    camelize,
    dasherize
  }
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
      hiddenEnvironments = ['production'],
      dataTestSuffix
    } = addonOptions;

    if (hiddenEnvironments.indexOf(environment) !== -1) { return; }

    const dasherizeAttr = dataTestSuffix ?
      `data-test-${dasherize(dataTestSuffix)}` : 'data-test';
    const camelizeAttr = camelize(dasherizeAttr);

    const componentAttrs = {
      attributeBindings: [`${camelizeAttr}:${dasherizeAttr}`]
    };

    if (autoTag) {
      componentAttrs[camelizeAttr] = computed(function() {
        const suffix = this.get('dataTestSuffix');
        let baseId = (this._debugContainerKey || '')
        .replace(/.*component:/g, '')
        .replace(/\//g, '-')
        .replace(/^-/, '');
        return suffix ? `${baseId}-${suffix}` : baseId;
      });
    }

    Component.reopen(componentAttrs);
  }
};
