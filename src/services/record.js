const record = require('../models/record');

module.exports = function getRecords({
  startDate, endDate, minCount, maxCount,
}) {
  const query = [
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $addFields: {
        totalCount: {
          $sum: '$counts',
        },
      },
    },
    {
      $match: {
        totalCount: {
          $lte: maxCount,
          $gte: minCount,
        },
      },
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    },
  ];
  return record.aggregate(query);
};
