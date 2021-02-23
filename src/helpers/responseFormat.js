const {
  ERROR_NOT_FOUND,
  VALIDATION_ERROR,
  FAILURE_CODE,
  FAILURE_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_MESSAGE,
} = require('./constants');

function errResponse(message) {
  return {
    code: FAILURE_CODE,
    msg: FAILURE_MESSAGE,
    error: VALIDATION_ERROR,
    issue: message,
  };
}

function success(res, records) {
  res.status(200).json({
    code: SUCCESS_CODE,
    msg: SUCCESS_MESSAGE,
    records,
  });
}

function notFoundError(res, message) {
  res.status(404).json(errResponse(message, ERROR_NOT_FOUND));
}

function badRequestError(res, message) {
  res.status(400).json(errResponse(message, VALIDATION_ERROR));
}

module.exports = {
  ok: success,
  notFound: notFoundError,
  badRequest: badRequestError,
};
