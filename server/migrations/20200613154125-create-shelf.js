export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Shelves', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })
    .then(() => queryInterface.addIndex('Shelves', ['createdAt']))
    .then(() => queryInterface.addIndex('Shelves', ['updatedAt'])),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Shelves'),
};
