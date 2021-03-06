const errors = require('../../common/errors/index');

const createResponseError = err => ({
  status: err.status,
  data: {
    code: err.code,
    message: err.message,
  },
});

function errorHandler(err, req, res, next) { //eslint-disable-line
  if (errors.isCustomHTTPError(err)) {
    return res.status(err.status).send(createResponseError(err));
  }

  const internalError = new errors.InternalServerError(err.message);
  return res.status(internalError.status).send(createResponseError(internalError));
}

module.exports = errorHandler;
