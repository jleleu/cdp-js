export const FilterUseCase = database => pattern => {
  const countries = database.findAllCountries();

  const animalMatchesPattern = a => new RegExp(pattern, 'i').test(a.name);
  const peopleMatchesAnimal = p => p.animals.some(animalMatchesPattern);
  const countryMatchesAnimal = c => c.people.some(peopleMatchesAnimal);

  return countries.filter(countryMatchesAnimal).map(c => {
    c.people = c.people.filter(peopleMatchesAnimal).map(p => {
      p.animals = p.animals.filter(animalMatchesPattern);
      return p;
    });
    return c;
  });
};
