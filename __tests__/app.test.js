const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/services/user-service');

describe('authentication-04 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  const user1 = {
    email: 'bishop@kaine.com', 
    password: 'dearlordbabyjesus', 
    roleTitle: 'USER'
  };
  // const signUpData = { email: 'bishop@kaine.com', password: 'dearlordbabyjesus' };

  it.only('POST route to /signup that responds with a newly created Users id', async () => {
    const res = await request(app).post('/api/v1/auth/signup').send(user1);
    console.log(res.body, 'RESBODY');
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'bishop@kaine.com',
      role: 'USER'
    });
  });

  it('If the email already exists, return 400', async () => {
    await User.createUser(user1);
    const res = await request(app).post('/api/v1/auth/signup').send({ 
      email: 'bishop@kaine.com',
      password: 'dearlordbabyjesus',
      role: 'USER'
    }
    );
    expect(res.status).toBe(400);
  });

  it('POST route to /login that responds with the existing Users id', async () => {
    await User.createUser(user1);
    const res = await request(app).post('/api/v1/auth/login').send(user1);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'bishop@kaine.com',
      role: 'USER'
    });
  });

  it('If credentials are incorrect, return 401', async () => {
    await User.createUser(user1);
    const res = await request(app).post('/api/v1/auth/login').send(user1);
    expect(res.status).toBe(401);
  }); 

  it('GET route to /me that responds with the currently logged in User', async () => {
    await User.createUser(user1);
    const agent = request.agent(app);
    await agent.post('/api/v1/auth/login').send(user1);
    const res = await agent.get('/api/v1/auth/me'); 

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'bishop@kaine.com',
      role: 'USER'
    });
  }); 

  afterAll(() => {
    pool.end();
  });
});
