const request = require('supertest');
const { infoUsers } = require('./info_users');
const app = require('../../app');

describe('Tests sign in', () => {
  test('Successful sign in', async done => {
    await request(app)
      .post('/users')
      .send(infoUsers.basicUser)
      .expect(201);

    await request(app)
      .post('/users/sessions')
      .send(infoUsers.login)
      .expect(200);
    return done();
  });
  test('Email not exists', async done => {
    await request(app)
      .post('/users/sessions')
      .send(infoUsers.login)
      .expect(400);
    return done();
  });
  test('Pass does not match', async done => {
    await request(app)
      .post('/users')
      .send(infoUsers.basicUser)
      .expect(201);

    const loginIncorrect = infoUsers.login;
    loginIncorrect.pass = 'invalidPassPepito';
    await request(app)
      .post('/users/sessions')
      .send(loginIncorrect)
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
