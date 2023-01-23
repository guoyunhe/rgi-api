export default function parseSerial(platform: string, rawSerial: string) {
  switch (platform) {
    case 'psx':
    case 'ps2':
    case 'ps3':
    case 'ps4':
    case 'psp':
    case 'psv':
      return rawSerial.trim().substring(0, 10).replaceAll(' ', '-');
    default:
      return rawSerial;
  }
}
