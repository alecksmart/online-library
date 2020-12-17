
export default (sequelize, DataTypes) => {
  const Shelf = sequelize.define('Shelf', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Shelf.associate = (models) => {
    Shelf.hasMany(models.Book);
  };
  return Shelf;
};
