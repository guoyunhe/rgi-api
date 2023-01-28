import { test } from '@japa/runner';
import parseSerial from './parseSerial';

test('parseSerial()', ({ assert }) => {
  assert.equal(parseSerial('ps2', 'SCES-50001#, SCES-50001-P'), 'SCES-50001');
});
