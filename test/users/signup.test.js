const request = require('supertest');
const app = require('../../app');
const { findUserByEmail } = require('../../app/services/users');

describe('Tests sign up', () => {
  const user = {
    name: 'pepito',
    last_name: 'Perez',
    mail: 'pepito@wolox.co',
    pass: 'PassPepit0'
  };

  test('Successful transaction', async done => {
    await request(app)
      .post('/users')
      .send(user)
      .expect(201);

    const mailFound = await findUserByEmail(user.mail);
    expect(mailFound.length).toBe(1);
    expect(mailFound[0].dataValues.name).toEqual(user.name);
    expect(mailFound[0].dataValues.last_name).toEqual(user.last_name);
    return done();
  });
  test('Email already exists', async done => {
    await request(app)
      .post('/users')
      .send(user);
    await request(app)
      .post('/users')
      .send(user)
      .expect(400);
    return done();
  });
  test('invalid pass', async done => {
    const userPassInvalid = user;
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