import middleware from '../middleware';
import {
  login, logout, register, isLoggedIn,
} from '../controllers/auth.controller';

const { authJwt: { verifyToken }, verifyUser: { verifyUserFull } } = middleware;

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post(
    '/api/auth/register',
    [
      verifyUserFull,
    ],
    register,
  );

  app.get(
    '/api/auth/logged',
    [
      verifyToken,
    ],
    isLoggedIn,
  );

  app.post('/api/auth/login', login);

  app.get('/api/auth/logout', logout);
};
