const yargs = require('yargs');
const context = require('context');

async function defaultHandler(handler) {
  await handler();

  process.exit(0);
}

// eslint-disable-next-line no-unused-expressions
yargs
  .command({
    command: 'collect [--only-images] <dirpath>',
    desc: 'Collect information about all files in the dirpath directory',
    builder: (_yargs) => {
      _yargs.positional('dirname', {
        describe: 'A directory where the files are placed',
        type: 'string',
      });
      _yargs.option('only-images', {
        describe: 'Only images will be processed',
        type: 'boolean',
      });
    },
    handler: async (argv) => {
      await defaultHandler(() => (
        context().services.collectFiles({
          onlyImages: !!argv['only-images'],
          dirpaths: [
            argv.dirpath,
          ],
        })
      ), argv);
    },
  })
  .command({
    command: 'doubles',
    desc: 'Find doubles in the db',
    handler: async (argv) => {
      const { loggers } = context();

      await defaultHandler(() => (
        context().services.findDoubles(loggers.doubleFiles)
      ), argv);
    },
  })
  .scriptName('doubler')
  .strict()
  .demandCommand(1, 'You need at least one command before moving on')
  .recommendCommands()
  .help()
  .argv;
