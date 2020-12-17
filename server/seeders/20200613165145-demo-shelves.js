/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Shelves', [
    {
      id: 1,
      name: 'Novels',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Magazines',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Dictionaries',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Shelves', null, {}),
};
