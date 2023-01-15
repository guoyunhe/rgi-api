import { test } from '@japa/runner';
import parseRedumpName from './parseRedumpName';

test('parseRedumpName()', ({ assert }) => {
  assert.deepEqual(parseRedumpName('Greatest Striker (Japan)'), {
    title: 'Greatest Striker',
    disc: 1,
    regions: ['Japan'],
    languages: [],
  });
  assert.deepEqual(
    parseRedumpName('Resident Evil 4 (Europe) (En,Fr,De,Es,It)'),
    {
      title: 'Resident Evil 4',
      disc: 1,
      regions: ['Europe'],
      languages: ['En', 'Fr', 'De', 'Es', 'It'],
    }
  );

  assert.deepEqual(
    parseRedumpName('Space Channel 5 - Special Edition (USA) (Disc 2)'),
    {
      title: 'Space Channel 5 - Special Edition',
      disc: 2,
      regions: ['USA'],
      languages: [],
    }
  );
});
