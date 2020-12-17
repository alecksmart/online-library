import db from '../../models';

const { Book, Shelf } = db;

export const adminBookDelete = (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then((book) => {
      if (book) {
        book.destroy();
        res.status(200)
          .send({ message: req.t('Book deleted!') });
      } else {
        res.status(200)
          .send({ message: req.t('Book not found!') });
      }
    })
    .catch((error) => {
      res.status(500)
        .send({
          message: req.t('Error deleting book!'), error,
        });
    });
};

export const adminBookUpdate = (req, res) => {
  Book.findOne({ where: { id: req.body.id } })
    .then(
      async (book) => {
        if (!book) {
          return res.status(404)
            .send({ message: req.t('Error updating book!') });
        }
        await book.update(
          {
            title: req.body.title,
            authorName: req.body.authorName,
            description: req.body.description,
            ShelfId: req.body.ShelfId,
          },
        );

        res.status(200)
          .send({ message: req.t('Book updated!') });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error updating book!') });
    });
};

export const adminBookCreate = (req, res) => {
  // const uuid = uuidv4();
  Book.create({
    title: req.body.title,
    authorName: req.body.authorName,
    description: req.body.description,
    ShelfId: req.body.ShelfId,
    UserId: req.userId,
  })
    .then((book) => {
      res.status(200)
        .send({
          message: req.t('Book created!'), book,
        });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error creating book!') });
    });
};

export const adminBook = (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then(
      (book) => {
        if (!book) {
          return res.status(404)
            .send({ message: req.t('Book not found!') });
        }
        res.status(200)
          .send({ book });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error getting book!') });
    });
};

export const adminBookList = (req, res) => {
  Book.findAll({
    attributes: ['id', 'title', 'description', 'authorName', 'cover', 'file'],
    include: [
      {
        model: Shelf,
        attributes: ['id', 'name'],
      },
    ],
  })
    .then((books) => {
      res.status(200)
        .send({ books });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error getting books list!') });
    });
};

export const adminBookUploadCover = (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then(
      (book) => {
        if (!book) {
          return res.status(404)
            .send({ message: req.t('Book not found!') });
        }


        book.update(
          { cover: req.file.filename },
        )
          .then((entry) => {
            res.status(200)
              .send({ book: entry });
          });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error saving book!') });
    });
};

export const adminBookUploadPdf = (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then(
      (book) => {
        if (!book) {
          return res.status(404)
            .send({ message: req.t('Book not found!') });
        }

        book.update(
          { file: req.file.filename },
        )
          .then((entry) => {
            res.status(200)
              .send({ book: entry });
          });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error saving book!') });
    });
};
