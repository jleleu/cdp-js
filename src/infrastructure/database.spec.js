import { Database } from './database.js';
import { describe, expect, it } from '@jest/globals';

describe('Database', () => {
  it('should load data (countries, peoples and animals)', () => {
    const countries = Database.findAllCountries();

    expect(countries).toHaveLength(5);
    expect(countries.some(c => c.name === 'Dillauti')).toBeTruthy();

    const dillauti = countries.find(c => c.name === 'Dillauti');
    expect(dillauti.people).toHaveLength(5);

    const winifred = dillauti.people.find(p => p.name === 'Winifred Graham');
    expect(winifred.animals).toHaveLength(6);

    expect(winifred.animals.some(a => a.name === 'Anoa')).toBeTruthy();
  });
});
