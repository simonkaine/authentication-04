const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/services/user-service');

describe('authentication-04 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // const signUpData = { email: 'bishop@kaine.com', password: 'dearlordbabyjesus' };

  it('POST route to /signup that responds with a newly created Users id', async () => {
    const res = await request(app).post('/api/v1/auth/signup').send({ email: 'bishop@kaine.com', password: 'dearlordbabyjesus' });

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'bishop@kaine.com',
    });
  });

  it('If the email already exists, return 400', async () => {
    await User.createUser({ email: 'bishop@kaine.com', password: 'dearlordbabyjesus' });
    const res = await request(app).post('/api/v1/auth/signup').send(
      { email: 'bishop@kaine.com', password: 'dearlordbabyjesus' }
    );
    expect(res.status).toBe(400);
  });

  it('POST route to /login that responds with the existing Users id', async () => {
    await User.createUser({ email: 'bishop@kaine.com', password: 'dearlordbabyjesus' });
    const res = await request(app).post('/api/v1/auth/login').send(
      { email: 'bishop@kaine.com', password: 'dearlordbabyjesus' }
    );
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'bishop@kaine.com',
    });
  });

  it('If credentials are incorrect, return 401', async () => {
    await User.createUser({ email: 'bishop@kaine.com', password: 'dearlordbabyjesus' });
    const res = await request(app).post('/api/v1/auth/login').send(
      { email: 'bishop@WRONG.com', password: 'dearlordinfantjesus' }
    );
    expect(res.status).toBe(401);
  });

  afterAll(() => {
    pool.end();
  });
});
