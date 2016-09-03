import Ember from 'ember';
import AddDataTestToViewInitializer
  from 'dummy/initializers/add-data-test-to-view';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | add data test to view', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('adds classBinding for data-test attribute', assert => {
  assert.expect(3);

  const config = {};
  application.register('config:environment', config);

  const Component = Ember.Component.extend();
  application.register('component:test-component', Component);

  AddDataTestToViewInitializer.initialize(application);

  const component = Component.create();
  component._debugContainerKey = 'component:test-component';
  const { attributeBindings } = component;

  assert.ok(
    attributeBindings.indexOf('dataTest:data-test') !== -1,
    'attributeBindings include data-test identifiers'
  );

  assert.equal(
    component.get('dataTest'),
    'test-component',
    'data-test attributes is name of component by default'
  );

  component.set('dataTestSuffix', 'lucky-charms');

  assert.equal(
    component.get('dataTest'),
    'test-component-lucky-charms',
    'data-test attributes is name of component -dataTestSuffix'
  );
});
