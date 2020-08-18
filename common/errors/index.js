const httpErrors = require('throw-http-errors');
/**
 * Generic middleware to compose custom error messages
 * here for socket transport and for HTTP transport
 * @param {} error 
 */
const isCustomHTTPError = (error) => {
  if (Object.keys(httpErrors).includes(error.name) || (error.status && Object.keys(httpErrors).includes(error.status.toString()))) {
    return true;
  }
  return false;
};

module.exports = Object.assign(
  {},
  httpErrors,
  {
    isCustomHTTPError,
  },
);
