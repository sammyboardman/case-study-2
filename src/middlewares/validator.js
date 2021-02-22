const joi = require('joi');
const { badRequest } = require('../utils/responseFormat');

const validateCountsOrder = (minCount, maxCount) => {
  if (minCount > maxCount) {
    throw new Error(
      'maxCounts should be greater than minCounts',
    );
  }
};
const validateDatesOrder = (startDate, endDate) => {
  if (startDate > endDate) {
    throw new Error(
      'EndDate should be greater or equal to startDate',
    );
  }
};
const dateValidator = (value) => {
  if (!value.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
    throw new Error('The date format is invalid! It should be in this format "YYYY-MM-DD"');
  }
  return value;
};

const recordValidationSchema = joi.object({
  startDate: joi.custom(dateValidator).required(),
  endDate: joi.custom(dateValidator).required(),
  minCount: joi.number().positive().required().integer(),
  maxCount: joi.number().positive().required().integer(),
});

const validateGetRecordRequestBody = async (req, res, next) => {
  try {
    await recordValidationSchema.validateAsync(req.body, { abortEarly: false, convert: false });
    validateCountsOrder(req.body.minCount, req.body.maxCount);
    validateDatesOrder(req.body.startDate, req.body.endDate);
    return next();
  } catch (err) {
    return badRequest(res, err.message);
  }
};

module.exports = {
  validateGetRecordRequestBody,
};
