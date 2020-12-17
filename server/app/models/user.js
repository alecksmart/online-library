
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    User.belongsToMany(models.Book, {
      through: 'UsersBooks', foreignKey: 'userId',
    });
  };
  return User;
};
