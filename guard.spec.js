import { parseArgs } from './guard.js';
import { describe, expect, it } from '@jest/globals';

describe('Parse Args', () => {
  describe('No matching argument', () => {
    it('should expect exactly 1 argument', () => {
      expect(parseArgs([]).error).toEqual('Expected exactly 1 argument');
    });

    it.each([['toto'], ['filter'], ['--countt']])(
      'should only allow --filter and --count arguments',
      arg => {
        expect(parseArgs([arg]).error).toEqual(`'${arg}' is not a valid argument`);
      }
    );

    it('should return the usage', () => {
      expect(parseArgs([]).usage).toEqual(`Usage: node app.js --filter=pattern | --count`);
    });
  });

  describe('--filter', () => {
    it.each([['--filter'], ['--filter='], ['--filter=+++']])(
      'should require an alphanumeric value for --filter',
      arg => {
        expect(parseArgs([arg]).error).toEqual(
          `'--filter' argument requires an alphanumeric value`
        );
      }
    );

    it('should return the key and value for --filter', () => {
      expect(parseArgs(['--filter=pattern'])).toEqual({ key: '--filter', value: 'pattern' });
    });
  });

  describe('--count', () => {
    it('should not accept any value for --count', () => {
      expect(parseArgs(['--count=123']).error).toEqual(
        `'--count' argument does not accept any value`
      );
    });

    it('should return the key for --count', () => {
      const args = parseArgs(['--count']);
      expect(args).toEqual({ key: '--count', value: undefined });
    });
  });
});
