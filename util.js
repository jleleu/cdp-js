import util from 'node:util';

export function log(response) {
  console.log(util.inspect(response, false, null, true));
}

export function isAlphaNumeric(value) {
  return new RegExp(/^[a-z0-9]+$/, 'i').test(value);
}
