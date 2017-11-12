import Application from '../../app';
import config from '../../config/environment';
import './ember-test-with-data/find-with-data';
import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';

export default function startApp(attrs, testWithDataSettings) {
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    updateConfig(application, testWithDataSettings);
    return application;
  });
}

const updateConfig = (app, settings) => {
  const config = app.resolveRegistration('config:environment');
  config['ember-test-with-data'] = settings || {};
};
