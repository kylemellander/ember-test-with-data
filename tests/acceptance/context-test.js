import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | context');

test('lists with index suffix', assert => {
  assert.expect(4);

  visit('/context');

  andThen(() => {
    assert.equal(findWithData('panel').length, 2, 'All panel elements are found');

    let $container = findWithData('container');
    assert.equal($container.length, 1, 'container element is found');

    let $nestedPanel = findWithData('panel', $container);
    assert.equal($nestedPanel.length, 1, 'only 1 nested panel is found');
    assert.equal($nestedPanel.text().trim(), 'Nested panel', 'correct panel is found');

  });
});
