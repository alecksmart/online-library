
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Books',
      'cover',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Books',
      'file',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Books', 'cover'),
    queryInterface.removeColumn('Books', 'file'),
  ]),
};
