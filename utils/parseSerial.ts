export default function parseSerial(platform: string, rawSerial: string) {
  switch (platform) {
    case 'PSX':
    case 'PS2':
      return rawSerial.trim().substring(0, 10).replaceAll(' ', '-');
  }
}
