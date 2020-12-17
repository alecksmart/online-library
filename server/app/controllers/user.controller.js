import { hashSync, compareSync } from 'bcryptjs';
import Sequelize from 'sequelize';

import db from '../models';

const { User, Book } = db;
const { QueryTypes } = Sequelize;
const limit = 24;

export const updateUserAccount = (req, res) => {
  User.findOne({ where: { id: req.userId } })
    .then(async (user) => {
      if (!user) {
        res.status(400)
          .send({ message: req.t('Please login!') });
        return;
      }

      const passwordIsValid = compareSync(
        req.body.oldPassword,
        user.password,
      );

      if (!passwordIsValid) {
        res.status(400)
          .send({ message: req.t('Invalid old password!') });
        return;
      }

      const updateValues = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      if (req.body.password > '') {
        updateValues.password = hashSync(req.body.password, 8);
      }

      const result = await user.update(updateValues);

      res.status(200)
        .send({
          id: user.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        });
    })
    .catch((err) => {
      res.status(500)
        .send({ message: req.t('Error updating user account!') });
    });
};

export const addBook = (req, res) => {
  User.findOne({ where: { id: req.userId } })
    .then(async (user) => {
      if (!user) {
        return res.status(400)
          .send({ message: req.t('Please login!') });
      }

      const book = await Book.findOne({ where: { id: req.params.bookId } });
      if (!book) {
        return res.status(400)
          .send({ message: req.t('Book not found!') });
      }

      user.addBook(book);
      res.status(200)
        .send({ message: req.t('Book added!') });
    })
    .catch((err) => {
      res.status(500)
        .send({ message: 'Error adding book!' });
    });
};

export const removeBook = (req, res) => {
  User.findOne({ where: { id: req.userId } })
    .then(async (user) => {
      if (!user) {
        res.status(400)
          .send({ message: req.t('Please login!') });
        return;
      }

      const book = await Book.findOne({ where: { id: req.params.bookId } });
      if (!book) {
        return res.status(400)
          .send({ message: req.t('Book not found!') });
      }

      user.removeBook(book);

      res.status(200)
        .send({ message: req.t('Book removed!') });
    })
    .catch((err) => {
      res.status(500)
        .send({ message: err.message });
    });
};

export const myBooks = (req, res) => {
  const { page, s, ord, dir } = req.query;

  const direction = dir === 'ASC' ? 'ASC' : 'DESC';
  const offset = (page > 0 ? page - 1 : 0);
  const orderBy = {
    createdAt: 'c.createdAt',
    authorName: 'c.authorName',
    title: 'c.title',
    shelf: 'd.name',
  };
  const order = ord in orderBy ? orderBy[ord] : 'c.createdAt';
  let addWhere = '';
  let replacements = {
    userId: req.userId,
    limit,
    offset,
  };
  if (s > '') {
    addWhere = 'AND (c.title LIKE :term OR c.authorName LIKE :term)';
    replacements = {
      ...replacements,
      term: `%${s}%`,
    };
  }

  /**
 * Sequelize STILL has this annoying bug
 * @see https://github.com/sequelize/sequelize/issues/8897
 * @todo: get rid of that as soon as the bug is fixed
 */
  const booksQuery = db.sequelize.query(`
SELECT
  c.id, c.title, c.authorName, c.description, c.file,
  c.cover, c.createdAt, d.id AS shelfId, d.name AS shelfName
FROM
  UsersBooks b, Books c, Shelves d
WHERE
  b.userId = :userId AND b.bookId =  c.id AND c.shelfId = d.id ${addWhere}
ORDER BY
  ${order} ${direction}
LIMIT :offset, :limit
  `, {
    type: QueryTypes.SELECT,
    replacements,
  })
    .then((books) => ({
      rows: books.map((v) => {
        const { id, title, authorName, cover, file, createdAt, shelfId, shelfName } = v;
        return {
          id,
          title,
          authorName,
          cover,
          file,
          createdAt,
          Shelf: {
            id: shelfId,
            name: shelfName,
          },
        };
      }),
    }));

  const countQuery = db.sequelize
    .query('SELECT COUNT(*) AS cnt FROM UsersBooks WHERE userId = :userId ', {
      type: QueryTypes.SELECT,
      replacements: { userId: req.userId },
    })
    .then((result) => (result[0] ? result[0].cnt : 0));

  Promise.all([booksQuery, countQuery])
    .then(([books, count]) => res.status(200)
      .send({
        ...books,
        pageSize: limit,
        count,
        countPages: Math.ceil((count / limit)),
      }))
    .catch((err) => {
      res.status(500)
        .send({ message: req.t('Error getting books list!') });
    });
};
