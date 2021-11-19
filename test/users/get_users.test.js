const request = require('supertest');
const helper = require('../../app/helpers/users');
const { createUser } = require('../factory/factory_users');
const { infoUsers } = require('./info_users');

const mockToken = jest.spyOn(helper, 'decodeToken');
const app = require('../../app');

describe('Tests to get all users', () => {
  const paginationQuery = {
    page: '1',
    size: '1'
  };

  test('Successful transaction', async done => {
    // Se crea un usuario
    await createUser(infoUsers.basicUser);
    mockToken.mockImplementationOnce(() => infoUsers.basicUser);

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
