export interface Importer {
  source: string;
  [k: string]: any;
}

export interface Platform {
  code: string;
  name: string;
  releaseDate: string;
  importers: Importer[];
}

export const platforms: Platform[] = [
  {
    code: 'psx',
    name: 'PlayStation',
    releaseDate: '1994-12-03',
    importers: [
      {
        source: 'redump',
        systemCode: 'psx',
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sony_-_PlayStation',
      },
    ],
  },
  {
    code: 'ps2',
    name: 'PlayStation 2',
    releaseDate: '2000-03-04',
    importers: [
      {
        source: 'redump',
        systemCode: 'ps2',
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sony_-_PlayStation_2',
      },
    ],
  },
  {
    code: 'ps3',
    name: 'PlayStation 3',
    releaseDate: '2006-11-11',
    importers: [
      {
        source: 'redump',
        systemCode: 'ps3',
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sony_-_PlayStation_3',
      },
    ],
  },
  {
    code: 'psp',
    name: 'PlayStation Portable',
    releaseDate: '2004-12-12',
    importers: [
      {
        source: 'redump',
        systemCode: 'psp',
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sony_-_PlayStation_Portable',
      },
    ],
  },
  {
    code: 'sg1000',
    name: 'SG-1000 (SC-3000)',
    releaseDate: '1983-07-15',
    importers: [
      {
        source: 'nointro',
        systemId: 19,
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sega_-_SG-1000',
      },
    ],
  },
  {
    code: 'ms',
    name: 'Master System',
    releaseDate: '1988-10-29',
    importers: [
      {
        source: 'nointro',
        systemId: 26,
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sega_-_Master_System_-_Mark_III',
      },
    ],
  },
  {
    code: 'md',
    name: 'Sega Genesis (Mega Drive)',
    releaseDate: '1988-10-29',
    importers: [
      {
        source: 'nointro',
        systemId: 32,
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sega_-_Mega_Drive_-_Genesis',
      },
    ],
  },
  {
    code: 'ss',
    name: 'Sega Saturn',
    releaseDate: '1994-11-22',
    importers: [
      {
        source: 'redump',
        systemCode: 'ss',
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sega_-_Saturn',
      },
    ],
  },
  {
    code: 'dc',
    name: 'Dreamcast',
    releaseDate: '1998-11-27',
    importers: [
      {
        source: 'redump',
        systemCode: 'dc',
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sega_-_Dreamcast',
      },
    ],
  },
  {
    code: 'gg',
    name: 'Game Gear',
    releaseDate: '1990-10-06',
    importers: [
      {
        source: 'nointro',
        systemId: 25,
      },
      {
        source: 'libretro-thumbnail',
        repo: 'Sega_-_Game_Gear',
      },
    ],
  },
];
