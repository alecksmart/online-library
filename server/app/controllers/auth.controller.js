import { sign } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import db from '../models';
import { secret } from '../config/auth.config';

const { User } = db;

export const isLoggedIn = (req, res) => {
  if (req.userId) {
    return res.status(200)
      .send({ result: 'OK' });
  }
  return res.status(401)
    .send({ message: req.t('Invalid credentials!') });
};

export const register = (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isAdmin: false,
    password: hashSync(req.body.password, 8),
  })
    // eslint-disable-next-line no-unused-vars
    .then((user) => {
      res.send({ message: req.t('User registration successful!') });
    })
    .catch((err) => {
      res.status(500)
        .send({ message: err.message });
    });
};

export const login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401)
          .send({ message: req.t('Invalid credentials!') });
      }

      const passwordIsValid = compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: req.t('Invalid credentials!'),
          });
      }

      const token = sign({ id: user.id }, secret, { expiresIn: 86400 });

      res.status(200)
        .send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          accessToken: token,
        });
    })
    .catch((err) => {
      res.status(500)
        .send({ message: err.message });
    });
};

export const logout = (req, res) => res.status(200)
  .send({ result: 'OK' });
