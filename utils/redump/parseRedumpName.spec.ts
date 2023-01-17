import { test } from '@japa/runner';
import parseRedumpName from './parseRedumpName';

test('parseRedumpName()', ({ assert }) => {
  assert.deepEqual(parseRedumpName('Greatest Striker (Japan)'), {
    title: 'Greatest Striker',
    mainName: 'Greatest Striker (Japan)',
    disc: 1,
    regions: ['Japan'],
    languages: [],
  });

  assert.deepEqual(
    parseRedumpName('Resident Evil 4 (Europe) (En,Fr,De,Es,It)'),
    {
      title: 'Resident Evil 4',
      mainName: 'Resident Evil 4 (Europe) (En,Fr,De,Es,It)',
      disc: 1,
      regions: ['Europe'],
      languages: ['En', 'Fr', 'De', 'Es', 'It'],
    }
  );

  assert.deepEqual(
    parseRedumpName('Space Channel 5 - Special Edition (USA) (Disc 2)'),
    {
      title: 'Space Channel 5 - Special Edition',
      mainName: 'Space Channel 5 - Special Edition (USA) (Disc 2)',
      disc: 2,
      regions: ['USA'],
      languages: [],
    }
  );

  assert.deepEqual(
    parseRedumpName('Tomb Raider - The Last Revelation (USA) (Rev 1)'),
    {
      title: 'Tomb Raider - The Last Revelation',
      mainName: 'Tomb Raider - The Last Revelation (USA)',
      disc: 1,
      regions: ['USA'],
      languages: [],
    }
  );

  assert.deepEqual(parseRedumpName('Tekken 3 (Europe) (Alt)'), {
    title: 'Tekken 3',
    mainName: 'Tekken 3 (Europe)',
    disc: 1,
    regions: ['Europe'],
    languages: [],
  });

  assert.deepEqual(
    parseRedumpName('Legend of Dragoon, The (Europe) (Disc 1)'),
    {
      title: 'The Legend of Dragoon',
      mainName: 'Legend of Dragoon, The (Europe) (Disc 1)',
      disc: 1,
      regions: ['Europe'],
      languages: [],
    }
  );
});
