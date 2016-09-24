import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | lists');

test('lists with index suffix', assert => {
  assert.expect(3);

  visit('/iterating');

  andThen(() => {
    assert.ok(findWithData('data-test-0').length === 1);
    assert.ok(findWithData('data-test-1').length === 1);
    assert.ok(findWithData('data-test-2').length === 1);
  });
});

test('lists with value suffix', assert => {
  assert.expect(3);

  visit('/iterating');

  andThen(() => {
    assert.ok(findWithData('data-test-frankenberry').length === 1);
    assert.ok(findWithData('data-test-booberry').length === 1);
    assert.ok(findWithData('data-test-count-chocula').length === 1);
  });
});
