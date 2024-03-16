import { isAlphaNumeric } from './util.js';

export function parseArgs(args) {
  if (args.length !== 1) return { error: 'Expected exactly 1 argument' };

  const [key, value] = args[0].split('=');

  if (!['--filter', '--count'].includes(key)) return { error: `'${key}' is not a valid argument` };

  if (key === '--filter' && (!value || !isAlphaNumeric(value)))
    return { error: `'${key}' argument requires an alphanumeric value` };

  if (key === '--count' && !!value) return { error: `'${key}' argument does not accept any value` };

  return { key, value };
}
