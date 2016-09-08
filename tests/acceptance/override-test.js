import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | override');

test('visiting /override', function(assert) {
  visit('/override');

  andThen(function() {
    assert.equal(currentURL(), '/override');
  });
});

test('dasherized tag overrides autoTagging', assert => {
  visit('/override');

  andThen(() => assert.ok(findWithData('dasherized-override').is('input')));
});

test('camelcased tag overrides autoTagging', assert => {
  visit('/override');

  andThen(() => assert.ok(findWithData('camelcased-override').is('textarea')));
});
