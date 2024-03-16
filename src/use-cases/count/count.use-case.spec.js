import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { CountUseCase } from './count.use-case.js';

describe('Count Use Case', () => {
  let FakeDatabase;
  let count;

  beforeAll(() => {
    FakeDatabase = {
      findAll: () => [
        {
          name: 'Dillauti',
          people: [
            {
              name: 'Winifred Graham',
              animals: [{ name: 'Anoa' }, { name: 'Duck' }, { name: 'Narwhal' }]
            },
            {
              name: 'Blanche Viciani',
              animals: [{ name: 'Barbet' }]
            }
          ]
        },
        {
          name: 'Tohabdal',
          people: [
            {
              name: 'Effie Houghton',
              animals: [{ name: 'Zebra' }, { name: 'Ring-tailed Lemur' }]
            }
          ]
        }
      ]
    };
  });

  beforeEach(() => {
    count = CountUseCase(FakeDatabase);
  });

  it('should return all countries', () => {
    expect(count()).toHaveLength(2);
  });

  it('should update countries names with the counts of people', () => {
    const countries = count();

    expect(countries[0].name).toBe('Dillauti [2]');
    expect(countries[1].name).toBe('Tohabdal [1]');
  });

  it('should update people names with the counts of animals', () => {
    const countries = count();

    const dillauti = countries.find(c => c.name === 'Dillauti [2]');
    expect(dillauti.people[0].name).toBe('Winifred Graham [3]');
    expect(dillauti.people[1].name).toBe('Blanche Viciani [1]');

    const tohabdal = countries.find(c => c.name === 'Tohabdal [1]');
    expect(tohabdal.people[0].name).toBe('Effie Houghton [2]');
  });
});
