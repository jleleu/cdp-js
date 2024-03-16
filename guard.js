import { isAlphaNumeric } from './util.js';

export function parseArgs(args) {
  const usage = `Usage: node app.js --filter=pattern | --count`;

  if (args.length !== 1) return { error: 'Expected exactly 1 argument', usage };

  const [key, value] = args[0].split('=');

  if (!['--filter', '--count'].includes(key))
    return { error: `'${key}' is not a valid argument`, usage };

  if (key === '--filter' && (!value || !isAlphaNumeric(value)))
    return { error: `'${key}' argument requires an alphanumeric value`, usage };

  if (key === '--count' && !!value)
    return { error: `'${key}' argument does not accept any value`, usage };

  return { key, value };
}
