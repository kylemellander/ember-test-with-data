import Ember from 'ember';

const { LinkComponent, TextField } = Ember;

const extendingObject = {
  init() {
    this._super(...arguments);
    this._addAttributeBindings();
  },

  _addAttributeBindings() {
    Object.keys(this).forEach(key => {
      if (key.substr(0, 10) === 'data-test-') {
        this.get('attributeBindings').push(key);
      }
    });
  }
};

LinkComponent.reopen(extendingObject);
TextField.reopen(extendingObject);
