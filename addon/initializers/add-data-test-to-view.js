import Ember from 'ember';

// Ember.assign() is not available in EmberJS 2.4.5. Fallback to Object.assign if Ember.assign is missing.
const assign = Ember.assign || Object.assign;

const {
  Component,
  computed,
  get,
  set,
  String: {
    camelize,
    dasherize
  }
} = Ember;

export default {
  name: 'add-data-test-to-view',
  initialize(app) {
    const isENVRegistered = typeof app.resolveRegistration === 'function';
    const ENV = isENVRegistered ?
      app.resolveRegistration('config:environment') :
      {};
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
    let suffix = get(this, 'dataTestSuffix');

    if (typeof suffix === 'number') { suffix = suffix.toString(); }

    let baseId = (this._debugContainerKey || '')
      .replace(/.*component:/g, '')
      .replace(/[/.]/g, '-')
      .replace(/^-/, '');

    if (typeof suffix === 'string') {
      return `${baseId}-${dasherize(suffix)}`;
    }
    return baseId;
  }),

  _buildAttrs({ dataTestSuffix, autoTag = true }) {
    const attrs = {};
    const dasherizeAttr = this._buildDasherizedAttr(dataTestSuffix);
    const camelizeAttr = camelize(dasherizeAttr);

    const attrBindingsLabels = [`${camelizeAttr}:${dasherizeAttr}`];
    attrs.init = function() {
      this._super(...arguments);
      if (get(this, 'tagName') !== '') {
        const oldAttrBindings = get(this, 'attributeBindings') || [];
        const newAttrBindings = attrBindingsLabels.concat(oldAttrBindings);
        set(this, 'attributeBindings', newAttrBindings);
      }
    };

    attrs[camelizeAttr] = computed.alias(dasherizeAttr);
    if (autoTag) { attrs[dasherizeAttr] = this.autoTagComputed; }

    return attrs;
  },

  _buildDasherizedAttr(suffix) {
    return suffix ? `data-test-${dasherize(suffix)}` : 'data-test';
  }
};
