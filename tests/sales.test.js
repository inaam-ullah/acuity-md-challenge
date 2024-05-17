const globals = require('@jest/globals');
const request = require('supertest');
const app = require('../src/app');

const { describe, it, expect } = globals;

describe('GET /api/sales?limit=2', () => {
  it(`should return 2 records from the SalesData database`, async () => {
    const res = await request(app).get('/api/sales?limit=2').send().expect(200);
    expect(res.body.length).toEqual(2);
  });
});
