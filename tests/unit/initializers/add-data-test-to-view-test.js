import Ember from 'ember';
import AddDataTestToViewInitializer
  from 'dummy/initializers/add-data-test-to-view';
import { module, test } from 'qunit';

const {
  Application,
  run
} = Ember;

let application, component;

module('Unit | Initializer | add data test to view', {
  beforeEach() {
    run(function() {
      application = Application.create();
    });
  },

  afterEach() {
    run(() => {
      if (application) {
        application.destroy();
        application = null;
        component = null;
      }
    });
  }
});

const initializeComponent = (config = {}) => {
  application.register('config:environment', config);

  const Component = Ember.Component.extend();
  application.register('component:test-component', Component);

  AddDataTestToViewInitializer.initialize(application);

  component = Component.create();
  component._debugContainerKey = 'component:test-component';
};

test('not set on production', assert => {
  initializeComponent({ environment: 'production' });

  assert.equal(component.attributeBindings.indexOf('dataTest:data-test'), -1);
});

test('not set when hiddenEnv matches env', assert => {
  initializeComponent({
    environment: 'staging',
    'ember-test-with-data': {
      hiddenEnvironments: ['production', 'staging']
    }
  });

  assert.equal(component.attributeBindings.indexOf('dataTest:data-test'), -1);
});

test('adds attributeBindings for data-test attribute', assert => {
  initializeComponent();

  assert.ok(component.attributeBindings.indexOf('dataTest:data-test') !== -1);
});

test('data-test attributes is name of component by default', assert => {
  initializeComponent();

  assert.equal(component.get('dataTest'), 'test-component');
});

test('data-test attributes is name of component -dataTestSuffix', assert => {
  initializeComponent();
  component.set('dataTestSuffix', 'lucky-charms');

  assert.equal(component.get('dataTest'), 'test-component-lucky-charms');
});
