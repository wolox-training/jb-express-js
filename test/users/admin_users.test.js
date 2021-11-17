const request = require('supertest');
const helper = require('../../app/helpers/users');
const { createUser } = require('../factory/factory_users');
const { infoUsers } = require('./info_users');
const { findUserByEmail } = require('../../app/services/users');
const { ROLE } = require('../../config/constants/users_constants');
const { ADMIN_USERS } = require('../../config/constants/routes');

const mockToken = jest.spyOn(helper, 'decodeToken');
const app = require('../../app');

describe('Tests admin users', () => {
  beforeEach(async () => {
    await createUser(infoUsers.adminUser);
  });

  test('Successful transaction', async done => {
    // await createUser(infoUsers.adminUser);
    mockToken.mockImplementationOnce(() => infoUsers.adminUser);

    await request(app)
      .post(ADMIN_USERS)
      .send(infoUsers.newAdminUser)
      .set({ token: 'token' })
      .expect(201);

    const mailFound = await findUserByEmail(infoUsers.newAdminUser.mail);
    expect(mailFound.length).toBe(1);
    expect(mailFound[0].dataValues.name).toEqual(infoUsers.newAdminUser.name);
    expect(mailFound[0].dataValues.last_name).toEqual(infoUsers.newAdminUser.last_name);
    expect(mailFound[0].dataValues.role).toEqual(ROLE.admin);
    expect(mockToken).toHaveBeenCalled();
    return done();
  });
  test('User alredy exists but it will change role to admin', async done => {
    await createUser({ ...infoUsers.basicUser, role: ROLE.basic });
    mockToken.mockImplementationOnce(() => infoUsers.adminUser);

    await request(app)
      .post(ADMIN_USERS)
      .send(infoUsers.basicUser)
      .set({ token: 'token' })
      .expect(200);

    const mailFound = await findUserByEmail(infoUsers.basicUser.mail);
    expect(mailFound.length).toBe(1);
    expect(mailFound[0].dataValues.role).toEqual(ROLE.admin);
    expect(mockToken).toHaveBeenCalled();
    return done();
  });
  test('User alredy exists with role admin', async done => {
    await createUser({ ...infoUsers.newAdminUser, role: ROLE.admin });
    mockToken.mockImplementationOnce(() => infoUsers.adminUser);

    await request(app)
      .post(ADMIN_USERS)
      .send(infoUsers.newAdminUser)
      .set({ token: 'token' })
      .expect(200);

    const mailFound = await findUserByEmail(infoUsers.newAdminUser.mail);
    expect(mailFound.length).toBe(1);
    expect(mailFound[0].dataValues.role).toEqual(ROLE.admin);
    expect(mockToken).toHaveBeenCalled();
    return done();
  });
  test('Left required params', async done => {
    await request(app)
      .post(ADMIN_USERS)
      .send({})
      .expect(400);
    return done();
  });
});
