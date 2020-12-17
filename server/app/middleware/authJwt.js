// https://bezkoder.com/node-js-jwt-authentication-mysql/

import jwt from 'jsonwebtoken';
import { secret } from '../config/auth.config';
import db from '../models';

const { User } = db;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401)
      .send({ message: req.t('Please login!') });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401)
        .send({ message: req.t('Please login!') });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  try {
    User.findByPk(req.userId)
      .then((user) => {
        if (user && user.isAdmin) {
          next();
          return;
        }
        res.status(403)
          .send({ message: req.t('Admin role required!') });
      });
  } catch (error) {
    res.status(403)
      .send({ message: req.t('Admin role required!') });
  }
};

export default {
  verifyToken,
  isAdmin,
};
