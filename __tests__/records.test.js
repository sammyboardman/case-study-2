const supertest = require('supertest');
const { server } = require('../src/server');

const request = supertest(server);

describe('POST /fetch-records', () => {
  const ENDPOINT = '/api/v1/fetch-records';

  afterAll(async () => {
    server.close();
  });

  it('Invalid minCount value', async (done) => {
    const invalidRequestBody = {
      startDate: '2015-01-01',
      endDate: '2020-01-01',
      minCount: '2700',
      maxCount: 2800,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/minCount/);
    done();
  });

  it('Invalid count order: minCount higher than maxCount', async (done) => {
    const invalidRequestBody = {
      startDate: '2015-01-01',
      endDate: '2020-01-01',
      minCount: 2700,
      maxCount: 20,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toEqual('maxCounts should be greater than minCounts');
    done();
  });
  it('Invalid dates order: startDate higher than endDate', async (done) => {
    const invalidRequestBody = {
      startDate: '2020-01-01',
      endDate: '2015-01-01',
      minCount: 1,
      maxCount: 20,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toEqual('EndDate should be greater or equal to startDate');
    done();
  });
  it('Missing payload field value', async (done) => {
    const invalidRequestBody = {
      endDate: '2015-01-01',
      minCount: 2700,
      maxCount: 2800,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/startDate/);
    done();
  });
  it('Missing endDate field value', async (done) => {
    const invalidRequestBody = {
      startDate: '2015-01-01',
      minCount: 2700,
      maxCount: 2800,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/endDate/);
    done();
  });

  it('Missing minCount field value', async (done) => {
    const invalidRequestBody = {
      startDate: '2015-01-01',
      endDate: '2020-01-01',
      maxCount: 2800,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/minCount/);
    done();
  });
  it('Missing maxCount field value', async (done) => {
    const invalidRequestBody = {
      startDate: '2015-01-01',
      endDate: '2020-01-01',
      minCount: 2800,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/maxCount/);
    done();
  });
  it('Negative minCount', async (done) => {
    const invalidRequestBody = {
      startDate: '2000-01-01',
      endDate: '2015-01-01',
      minCount: -1,
      maxCount: 20,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/minCount/);
    expect(body.issue).toMatch(/must be a positive number/);
    done();
  });
  it('Negative maxCount', async (done) => {
    const invalidRequestBody = {
      startDate: '2000-01-01',
      endDate: '2015-01-01',
      minCount: 1,
      maxCount: -20,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/maxCount/);
    expect(body.issue).toMatch(/must be a positive number/);
    done();
  });
  it('Invalid Date format', async (done) => {
    const invalidRequestBody = {
      startDate: '2000-011-01',
      endDate: '2015-01-01',
      minCount: 1,
      maxCount: -20,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    expect(body.issue).toMatch(/startDate/);
    expect(body.issue).toMatch(/The date format is invalid/);
    done();
  });

  it('Success with valid input data', async (done) => {
    const invalidRequestBody = {
      startDate: '2015-11-01',
      endDate: '2020-01-01',
      minCount: 1000,
      maxCount: 2000,
    };

    const { body } = await request.post(ENDPOINT).send(invalidRequestBody);

    expect(body.code).toEqual(0);
    expect(body.msg).toEqual('Success');
    body.records.forEach((record) => {
      expect(record.key).toBeDefined();
      expect(record.createdAt).toBeDefined();
      expect(record.totalCount).toBeDefined();
    });
    done();
  });
  it('Invalid routes', async (done) => {
    const { body } = await request.post('/test').send();

    expect(body.code).toEqual(99);
    expect(body.msg).toEqual('Request Failed');
    done();
  });
});
