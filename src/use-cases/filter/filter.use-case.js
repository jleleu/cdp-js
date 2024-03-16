export const FilterUseCase = database => pattern => {
  const countries = database.findAllCountries();

  const animalMatch = a => new RegExp(pattern, 'i').test(a.name);
  const peopleWithAnimalMatch = p => p.animals.some(animalMatch);
  const countryWithPeopleWithAnimalMatch = c => c.people.some(peopleWithAnimalMatch);

  return countries.filter(countryWithPeopleWithAnimalMatch).map(c => {
    c.people = c.people.filter(peopleWithAnimalMatch).map(p => {
      p.animals = p.animals.filter(animalMatch);
      return p;
    });
    return c;
  });
};
