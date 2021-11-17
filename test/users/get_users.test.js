const request = require('supertest');
const helper = require('../../app/helpers/users');
const { createUser } = require('../factory/factory_users');

const mockToken = jest.spyOn(helper, 'decodeToken');
const app = require('../../app');

describe('Tests to get all users', () => {
  const user = {
    name: 'pepito',
    last_name: 'Perez',
    mail: 'pepito@wolox.co',
    pass: 'PassPepit0'
  };

  const paginationQuery = {
    page: '1',
    zise: '1'
  };

  test('Successful transaction', async done => {
    // Se crea un usuario
    await createUser(user);
    mockToken.mockImplementationOnce(() => user);

    await request(app)
      .get('/users')
      .query(paginationQuery)
      .set({ token: 'tokenInvalid' })
      .expect(200);

    expect(mockToken).toHaveBeenCalled();
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
