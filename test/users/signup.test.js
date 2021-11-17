const request = require('supertest');
const { infoUsers } = require('./info_users');
const app = require('../../app');
const { findUserByEmail } = require('../../app/services/users');

describe('Tests sign up', () => {
  test('Successful transaction', async done => {
    await request(app)
      .post('/users')
      .send(infoUsers.basicUser)
      .expect(201);

    const mailFound = await findUserByEmail(infoUsers.basicUser.mail);
    expect(mailFound.length).toBe(1);
    expect(mailFound[0].dataValues.name).toEqual(infoUsers.basicUser.name);
    expect(mailFound[0].dataValues.last_name).toEqual(infoUsers.basicUser.last_name);
    return done();
  });
  test('Email already exists', async done => {
    await request(app)
      .post('/users')
      .send(infoUsers.basicUser);
    await request(app)
      .post('/users')
      .send(infoUsers.basicUser)
      .expect(400);
    return done();
  });
  test('invalid pass', async done => {
    const userPassInvalid = infoUsers.basicUser;
    userPassInvalid.pass = 'pepito';
    await request(app)
      .post('/users')
      .send(userPassInvalid)
      .expect(400);
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
