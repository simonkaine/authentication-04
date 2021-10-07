const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('authentication-04 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // const signUpData = { email: 'bishop@kaine.com', password: 'dearlordbabyjesus' };

  it('POST route to /signup that responds with a newly created Users id', async () => {
    const res = await request(app).post('/api/v1/signup').send({ email: 'bishop@kaine.com', password: 'dearlordbabyjesus' });

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'bishop@kaine.com',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
