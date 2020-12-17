/* eslint-disable import/prefer-default-export */
import Sequelize from 'sequelize';
import get from 'lodash/get';
import db from '../models';

const { Book, Shelf, User } = db;
const { Op } = Sequelize;
const limit = 24;

export const latestBooks = (req, res) => {
  let options = {};
  const { page, s, ord, dir, forId, shelfId } = req.query;

  try {
    const numPage = page >= 1 ? page : 1;
    const offset = (numPage - 1) * limit;
    const orderByList = {
      createdAt: 'createdAt',
      authorName: 'authorName',
      title: 'title',
      shelf: Sequelize.literal('Shelf.name'),
    };
    const orderBy = ord in orderByList
      ? orderByList[ord]
      : orderByList.createdAt;
    const orderDir = dir === 'ASC' ? 'ASC' : 'DESC';
    const order = [[orderBy, orderDir]];
    let where = {
      cover: { [Op.ne]: null },
      file: { [Op.ne]: null },
    };
    if (s > '') {
      where = {
        ...where,
        [Op.or]: [
          { title: { [Op.like]: `%${s}%` } },
          { authorName: { [Op.like]: `%${s}%` } },
        ],
      };
    }

    const whereShelf = shelfId > 0 ? { id: { [Op.eq]: shelfId } } : {};

    options = {
      attributes: [
        'id', 'title', 'authorName',
        'description', 'file', 'cover',
        'createdAt',
      ],
      offset,
      where,
      limit,
      order,
      include: [
        {
          model: Shelf,
          attributes: ['id', 'name'],
          where: whereShelf,
        },
      ],
    };
  } catch (err) {
    res.status(500)
      .send({ message: err.message });
  }

  const booksQuery = Book.findAndCountAll(options);
  let myBooksIds = [];

  if (forId > 0) {
    myBooksIds = User.findOne({
      attributes: ['id'],
      where: { id: forId },
      include: [
        {
          model: Book,
          through: { attributes: [] },
          attributes: ['id'],
        },
      ],
    })
      .then((result) => get(result, 'Books', [])
        .map((v) => v.id));
  }

  Promise.all([booksQuery, myBooksIds])
    .then(([books, booksIds]) => res.status(200)
      .send({
        ...books,
        pageSize: limit,
        countPages: Math.ceil((books.count / limit)),
        myBooksIds: booksIds,
      }))
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error getting books list!') });
    });
};
