const { beforeEach } = require('@jest/globals');
const db = require('../src/db/db');

beforeEach(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.close();
});
