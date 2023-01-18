const { readFile, stat } = require('fs/promises');

(async () => {
  const filePath =
    'tmp/libretro-thumbnail-psx/Sony_-_PlayStation-master/Super Puzzle Fighter II Turbo (Europe).png';

  const buffer = await readFile(filePath);

  const info = await stat(filePath);

  console.log(buffer.length);
  console.log(buffer.byteLength);
  console.log(info.size);
})();
