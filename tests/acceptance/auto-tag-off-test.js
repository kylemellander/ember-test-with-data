import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | auto tag (off)', {
  testWithDataSettings: {
    autoTag: false
  }
});

test('link-to tag does not get autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('link-to').length === 0));
});

test('input helper does not get autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('text-field').length === 0));
});

test('textarea helper does not get autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('text-area').length === 0));
});

test('custom component does not get autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('data-test').length === 0));
});
