const request = require('supertest');
const express = require('express');
const healthcareProfessionalsRouter = require('../src/api/healthcareProfessionals');
const app = express();

app.use(express.json());
app.use('/api/healthcare-professionals', healthcareProfessionalsRouter);

describe('GET /api/healthcare-professionals/top', () => {
  it('should return 400 if limit is not provided', async () => {
    const res = await request(app).get('/api/healthcare-professionals/top');
    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if limit is not an integer', async () => {
    const res = await request(app).get('/api/healthcare-professionals/top?limit=abc');
    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if strategy is invalid', async () => {
    const res = await request(app).get('/api/healthcare-professionals/top?limit=3&strategy=invalid');
    expect(res.statusCode).toEqual(400);
  });

  it('should return 200 and the top HCPs', async () => {
    const res = await request(app).get('/api/healthcare-professionals/top?limit=3&strategy=elephant');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});
