const { Router } = require('express');
const validateGetRecordRequestBody = require('../middlewares/validator');
const controller = require('../controllers/record');

const recordsRouter = new Router();
recordsRouter.post('/', validateGetRecordRequestBody, controller);

module.exports = recordsRouter;
