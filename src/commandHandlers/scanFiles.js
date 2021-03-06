const _ = require('lodash');
const context = require('context');

module.exports = async (argv) => {
  const { services } = context();

  return services.scanFilesInDirectory({
    showDoubles: !!argv['show-doubles'],
    dirpath: argv.dirpath,
  });
};
