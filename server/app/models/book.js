
export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    authorName: DataTypes.STRING,
    file: DataTypes.STRING,
    cover: DataTypes.STRING,
  }, {});
  Book.associate = (models) => {
    Book.belongsToMany(models.User, {
      through: 'UsersBooks', foreignKey: 'bookId',
    });
    Book.belongsTo(models.User);
    Book.belongsTo(models.Shelf);
  };
  return Book;
};
