export const CountUseCase = database => () => {
  const countries = database.findAllCountries();

  countries.forEach(c => {
    c.name = `${c.name} [${c.people.length}]`;
    c.people.forEach(p => {
      p.name = `${p.name} [${p.animals.length}]`;
    });
  });

  return countries;
};
