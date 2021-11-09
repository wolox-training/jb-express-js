const request = require('supertest');
const app = require('../../app');

describe('Tests sign in', () => {
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

  test('Successful sign in', async done => {
    await request(app)
      .post('/users')
      .send(user)
      .expect(201);

    await request(app)
      .post('/users/sessions')
      .send(login)
      .expect(200);
    return done();
  });
  test('Email not exists', async done => {
    await request(app)
      .post('/users/sessions')
      .send(login)
      .expect(400);
    return done();
  });
  test('Pass does not match', async done => {
    await request(app)
      .post('/users')
      .send(user)
      .expect(201);

    login.pass = 'invalidPassPepito';
    await request(app)
      .post('/users/sessions')
      .send(login)
      .expect(401);
    return done();
  });
  test('Left required params', async done => {
    await request(app)
      .post('/users')
      .send({})
      .expect(400);
    return done();
  });
});
