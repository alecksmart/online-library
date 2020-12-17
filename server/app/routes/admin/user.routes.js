import middleware from '../../middleware';
import {
  adminUserDelete,
  adminUserUpdate,
  adminUserCreate,
  adminUser,
  adminUserList,
} from '../../controllers/admin/user.controller';

const { authJwt: { verifyToken, isAdmin }, verifyUser: { verifyUserForAdmin } } = middleware;

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.delete(
    '/api/admin/user/:id',
    [verifyToken, isAdmin],
    adminUserDelete,
  );

  app.put(
    '/api/admin/user',
    [verifyToken, isAdmin, verifyUserForAdmin],
    adminUserUpdate,
  );

  app.post(
    '/api/admin/user',
    [verifyToken, isAdmin, verifyUserForAdmin],
    adminUserCreate,
  );

  app.get(
    '/api/admin/user/:id',
    [verifyToken, isAdmin],
    adminUser,
  );

  app.get(
    '/api/admin/user',
    [verifyToken, isAdmin],
    adminUserList,
  );
};
