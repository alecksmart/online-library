
import middleware from '../../middleware';
import {
  adminBookDelete,
  adminBookUpdate,
  adminBookCreate,
  adminBook,
  adminBookList,
  adminBookUploadCover,
  adminBookUploadPdf,
} from '../../controllers/admin/book.controller';
import { pdfUpload } from '../../middleware/storage';

const {
  authJwt: { verifyToken, isAdmin },
  verifyBook: { verifyBookForAdmin },
  imgUpload,
} = middleware;

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.delete(
    '/api/admin/book/:id',
    [verifyToken, isAdmin],
    adminBookDelete,
  );

  app.put(
    '/api/admin/book',
    [verifyToken, isAdmin, verifyBookForAdmin],
    adminBookUpdate,
  );

  app.post(
    '/api/admin/book',
    [verifyToken, isAdmin, verifyBookForAdmin],
    adminBookCreate,
  );

  app.get(
    '/api/admin/book/:id',
    [verifyToken, isAdmin],
    adminBook,
  );

  app.get(
    '/api/admin/book',
    [verifyToken, isAdmin],
    adminBookList,
  );

  app.post(
    '/api/admin/book/cover/:id',
    [verifyToken, isAdmin, imgUpload.single('coverJpg')],
    adminBookUploadCover,
  );

  app.post(
    '/api/admin/book/pdf/:id',
    [verifyToken, isAdmin, pdfUpload.single('filePdf')],
    adminBookUploadPdf,
  );
};
