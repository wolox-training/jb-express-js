const request = require('supertest');
const app = require('../../app');

describe('Tests sign in', () => {
  const paginationQuery = {
    page: '0',
    zise: '3'
  };

  const user = {
    name: 'pepito',
    last_name: 'Perez',
    mail: 'pepito@wolox.co',
    pass: 'PassPepit0'
  };

  const login = {
    mail: 'pepito@wolox.co',
    pass: 'PassPepit0'
  };

  test('Successful transaction', async done => {
    await request(app)
      .post('/users')
      .send(user)
      .expect(201);

    const logInData = await request(app)
      .post('/users/sessions')
      .send(login)
      .expect(200);

    await request(app)
      .get('/users')
      .query(paginationQuery)
      .set({ token: logInData.body.token })
      .expect(200);

    return done();
  });
  test('Token invalid', async done => {
    const tokenInvalid = 'tokenDePepito';
    await request(app)
      .get('/users')
      .query(paginationQuery)
      .set({ token: tokenInvalid })
      .expect(401);
    return done();
  });
});
