import middleware from '../../middleware';
import {
  adminShelfDelete,
  adminShelfUpdate,
  adminShelfCreate,
  adminShelf,
  adminShelfList,
} from '../../controllers/admin/shelf.controller';

const { authJwt: { verifyToken, isAdmin }, verifyShelf: { verifyShelfForAdmin } } = middleware;

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.delete(
    '/api/admin/shelf/:id',
    [verifyToken, isAdmin],
    adminShelfDelete,
  );

  app.put(
    '/api/admin/shelf',
    [verifyToken, isAdmin, verifyShelfForAdmin],
    adminShelfUpdate,
  );

  app.post(
    '/api/admin/shelf',
    [verifyToken, isAdmin, verifyShelfForAdmin],
    adminShelfCreate,
  );

  app.get(
    '/api/admin/shelf/:id',
    [verifyToken, isAdmin],
    adminShelf,
  );

  app.get(
    '/api/admin/shelf',
    // shelf list is used to site build menu
    // it is safe to reuse it
    adminShelfList,
  );
};
