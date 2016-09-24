import Ember from 'ember';

const { Test: { registerHelper } } = Ember;

export default registerHelper('findWithData', (app, value = '') => {
  const config = app.resolveRegistration('config:ember-test-with-data') || {};
  const attr = config.attr;
  const selector = value ? `[${attr}=${value}]` : `[${attr}]`;
  return find(selector);
});
