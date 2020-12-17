export default (sequelize, DataTypes) => {
  const UserBook = sequelize.define('UserBook', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Books',
        key: 'id',
      },
    },
  });
  return UserBook;
};
