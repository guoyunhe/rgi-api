export interface RawRom {
  name: string;
  size: string;
  crc: string;
  md5: string;
  sha1: string;
}

export interface RawGame {
  name: string;
  category: string;
  description: string;
  rom: RawRom | RawRom[];
}
