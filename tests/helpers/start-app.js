import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import './ember-test-with-data/find-with-data';

export default function startApp(attrs, testWithDataSettings) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);

    updateConfig(application, testWithDataSettings);

    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}

const updateConfig = (app, settings) => {
  const config = app.resolveRegistration('config:environment');
  config['ember-test-with-data'] = settings || {};
};
