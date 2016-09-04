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
