const { getRecords } = require('../services/record');
const { ok, badRequest } = require('../helpers/responseFormat');

const getRecordsController = async (req, res) => {
  try {
    const records = await getRecords(req.body);
    return ok(res, records);
  } catch (err) {
    return badRequest(req, res, err);
  }
};

module.exports = {
  getRecordsController,
};
