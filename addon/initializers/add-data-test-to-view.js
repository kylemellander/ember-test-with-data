import Ember from 'ember';

const {
  assign,
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
      hiddenEnvironments = ['production'],
    } = addonOptions;

    if (hiddenEnvironments.indexOf(environment) !== -1) { return; }

    if (environment === 'test') {
      app.register('config:ember-test-with-data', assign(addonOptions, {
        attr: this._buildDasherizedAttr(addonOptions.dataTestSuffix)
      }));
    }

    const componentAttrs = this._buildAttrs(addonOptions);

    Component.reopen(componentAttrs);
  },

  autoTagComputed: computed('dataTestSuffix', function() {
    let suffix = this.get('dataTestSuffix');

    if (typeof suffix === 'number') { suffix = suffix.toString(); }

    let baseId = (this._debugContainerKey || '')
      .replace(/.*component:/g, '')
      .replace(/\//g, '-')
      .replace(/^-/, '');

    return typeof suffix === 'string' ? `${baseId}-${dasherize(suffix)}` : baseId;
  }),

  _buildAttrs({ dataTestSuffix, autoTag = true }) {
    const attrs = {};
    const dasherizeAttr = this._buildDasherizedAttr(dataTestSuffix);
    const camelizeAttr = camelize(dasherizeAttr);

    attrs.attributeBindings = [`${camelizeAttr}:${dasherizeAttr}`];
    attrs[camelizeAttr] = computed.alias(dasherizeAttr);
    if (autoTag) { attrs[dasherizeAttr] = this.autoTagComputed; }

    return attrs;
  },

  _buildDasherizedAttr(suffix) {
    return suffix ? `data-test-${dasherize(suffix)}` : 'data-test';
  }
};
