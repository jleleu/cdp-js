import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { FilterUseCase } from './filter.use-case.js';

describe('Filter Use Case', () => {
  let FakeDatabase;
  let filter;

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
              animals: [{ name: 'Barbet' }, { name: 'Rhea' }, { name: 'Snakes' }]
            }
          ]
        },
        {
          name: 'Tohabdal',
          people: [
            {
              name: 'Effie Houghton',
              animals: [{ name: 'Zebra' }, { name: 'Ring-tailed Lemur' }, { name: 'Fly' }]
            }
          ]
        }
      ]
    };
  });

  beforeEach(() => {
    filter = FilterUseCase(FakeDatabase);
  });

  it.each([
    ['Anoa', 'Dillauti'],
    ['no', 'Dillauti'],
    ['Ze', 'Tohabdal'],
    ['bra', 'Tohabdal']
  ])('should only return countries containing matching animals', (animal, country) => {
    expect(filter(animal)).toHaveLength(1);
    expect(filter(animal)[0].name).toEqual(country);
  });

  it.each([
    ['Anoa', 'Winifred Graham'],
    ['no', 'Winifred Graham'],
    ['Ze', 'Effie Houghton'],
    ['bra', 'Effie Houghton']
  ])('should only return people containing matching animals', (animal, people) => {
    expect(filter(animal)[0].people).toHaveLength(1);
    expect(filter(animal)[0].people[0].name).toEqual(people);
  });

  it.each([['Anoa'], ['Rhea'], ['Ring-tailed Lemur']])(
    'should only return matching animals',
    animal => {
      expect(filter(animal)[0].people[0].animals).toHaveLength(1);
      expect(filter(animal)[0].people[0].animals[0].name).toEqual(animal);
    }
  );
});
