const { model, Schema } = require('mongoose');

const recordSchema = new Schema({
  key: {
    type: String,
  },
  counts: {
    type: [Number],
  },
  value: {
    type: String,
  },
  createdAt: {
    type: Date,
    index: true,
  },
});

module.exports = model('record', recordSchema);
