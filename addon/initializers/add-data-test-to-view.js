import Ember from 'ember';

const {
  assign,
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

    const attributeBindingsLabel = `${camelizeAttr}:${dasherizeAttr}`;
    attrs.init = function() {
      this._super(...arguments);
      if (this.get('tagName') !== '') {
        const attributeBindings = get(this, 'attributeBindings');
        if (attributeBindings) {
          attributeBindings.push(attributeBindingsLabel);
        } else {
          set(this, 'attributeBindings', [attributeBindingsLabel]);
        }
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
