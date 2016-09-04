import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | auto tag');

test('visiting /auto-tag', assert => {
  visit('/auto-tag');

  andThen(() => assert.equal(currentURL(), '/auto-tag'));
});

test('link-to tag gets autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('link-to').is('a')));
});

test('input helper gets autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('text-field').is('input')));
});

test('textarea helper gets autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('text-area').is('textarea')));
});

test('custom component gets autoTagged', assert => {
  visit('/auto-tag');

  andThen(() => assert.ok(findWithData('data-test').is('div')));
});
