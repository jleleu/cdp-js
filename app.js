import { Database } from './src/infrastructure/database.js';
import { FilterUseCase } from './src/use-cases/filter/filter.use-case.js';
import { CountUseCase } from './src/use-cases/count/count.use-case.js';
import { parseArgs } from './guard.js';
import { log } from './util.js';
import { argv } from 'node:process';

function main() {
  const args = parseArgs(argv.slice(2));

  if (args.error) {
    const usage = `Usage: node app.js --filter=pattern | --count`;
    console.log(args.error + '\n\n' + usage);
    process.exit(1);
  }

  if (args.key === '--filter') log(FilterUseCase(Database)(args.value));
  else if (args.key === '--count') log(CountUseCase(Database)());
}

main();
