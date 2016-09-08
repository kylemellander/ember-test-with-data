import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | override', {
  testWithDataSettings: {
    dataTestSuffix: 'id'
  }
});

test('dasherized with suffix tag overrides autoTagging', assert => {
  visit('/override');

  andThen(() =>
    assert.equal(findWithData('dasherized-suffix-override').get(0).tagName, 'P')
  );
});

test('camelcased with suffix tag overrides autoTagging', assert => {
  visit('/override');

  andThen(() =>
    assert.ok(findWithData('camelcased-suffix-override').is('div'))
  );
});
