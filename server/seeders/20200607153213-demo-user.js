/* eslint-disable no-unused-vars */
import { hashSync } from 'bcryptjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

faker.locale = 'en';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    id: 1,
    firstName: 'Admin',
    lastName: 'Test',
    email: 'admin@email.com',
    password: hashSync('12345', 8),
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    firstName: 'User',
    lastName: 'Test',
    email: 'user@email.com',
    password: hashSync('12345', 8),
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, ...(() => {
    const ret = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index <= 9; index++) {
      ret.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashSync('12345', 8),
        isAdmin: false,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      });
    }
    return ret;
  })()]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
