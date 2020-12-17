import db from '../../models';

const { Shelf } = db;

export const adminShelfDelete = (req, res) => {
  Shelf.findOne({ where: { id: req.params.id } })
    .then((shelf) => shelf.destroy())
    .then(() => {
      res.status(200)
        .send({ message: req.t('Shelf deleted!') });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error deleting shelf!') });
    });
};

export const adminShelfUpdate = (req, res) => {
  Shelf.findOne({ where: { id: req.body.id } })
    .then(
      async (shelf) => {
        if (!shelf) {
          return res.status(404)
            .send({ message: req.t('Error updating shelf!') });
        }
        await shelf.update(
          {
            name: req.body.name,
            description: req.body.description,
          },
        );

        res.status(200)
          .send({ message: req.t('Shelf updated!') });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error updating shelf!') });
    });
};

export const adminShelfCreate = (req, res) => {
  Shelf.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then(() => {
      res.status(200)
        .send({ message: req.t('Shelf created!') });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error creating shelf!') });
    });
};

export const adminShelf = (req, res) => {
  Shelf.findOne({ where: { id: req.params.id } })
    .then(
      (shelf) => {
        if (!shelf) {
          return res.status(404)
            .send({ message: req.t('Shelf not found!') });
        }
        res.status(200)
          .send({ shelf });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error getting shelf!') });
    });
};

export const adminShelfList = (req, res) => {
  db.sequelize.query('SELECT Shelves.*, COUNT(Books.shelfId) AS cntBooks FROM Shelves LEFT JOIN Books ON Shelves.id = Books.shelfId GROUP BY Books.shelfId ORDER BY Shelves.name ASC', {
    model: Shelf,
    mapToModel: true,
  })
    .then((shelves) => {
      res.status(200)
        .send({ shelves });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error getting shelves list!') });
    });
};
