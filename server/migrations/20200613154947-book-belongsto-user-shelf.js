export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface
      .addColumn(
        'Books',
        'userId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ),
    queryInterface.addColumn(
      'Books',
      'shelfId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shelves',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    ),
  ]),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface
      .removeColumn(
        'Books',
        'userId',
      ),
    queryInterface.removeColumn(
      'Books',
      'shelfId',
    ),
  ]),
};
