import middleware from '../middleware';
import {
  updateUserAccount,
  addBook,
  removeBook,
  myBooks,
} from '../controllers/user.controller';

const { authJwt: { verifyToken }, verifyUser: { verifyUserForUpdate } } = middleware;

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.put(
    '/api/user/update',
    [verifyToken, verifyUserForUpdate],
    updateUserAccount,
  );

  app.put(
    '/api/user/addBook/:bookId',
    [verifyToken],
    addBook,
  );

  app.put(
    '/api/user/removeBook/:bookId',
    [verifyToken],
    removeBook,
  );

  app.get(
    '/api/user/myBooks',
    [verifyToken],
    myBooks,
  );
};
