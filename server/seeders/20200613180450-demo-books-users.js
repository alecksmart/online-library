/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import uniqWith from 'lodash/uniqWith';
import models from '../app/models';

faker.locale = 'en';
export default {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await models.sequelize.models.User.findAll();
    const allBooks = await models.sequelize.models.Book.findAll();
    const data = [];
    allUsers.forEach((user, i) => {
      let book;
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < 3; index++) {
        book = faker.random.arrayElement(allBooks);
        data.push({
          userId: user.id,
          bookId: book.id,
        });
      }
    });
    const clean = uniqWith(data, (a, b) => a.userId === b.userId && a.bookId === b.bookId);
    return queryInterface.bulkInsert('UsersBooks', clean);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UsersBooks', null, {}),
};
