const _ = require('lodash');
const context = require('context');

module.exports = async () => {
  const { services } = context();

  return services.rescanFiles();
};
