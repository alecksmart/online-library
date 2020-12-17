import { hashSync } from 'bcryptjs';
import { Op } from 'sequelize';
import db from '../../models';

const { User } = db;

export const adminUserDelete = (req, res) => {
  User.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id,
        [Op.not]: req.userId,
      },
    },
  })
    .then((user) => user.destroy())
    .then(() => {
      res.status(200)
        .send({ message: req.t('User deleted!') });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error deleting user!') });
    });
};

export const adminUserUpdate = (req, res) => {
  User.findOne({
    where: {
      id: {
        [Op.eq]: req.body.id,
        [Op.not]: req.userId,
      },
    },
  })
    .then(
      async (user) => {
        if (!user) {
          return res.status(404)
            .send({ message: req.t('Error updating user!') });
        }

        const updateValues = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          isAdmin: req.body.isAdmin,
        };
        if (req.body.password > '') {
          updateValues.password = hashSync(req.body.password, 8);
        }

        await user.update(updateValues);

        res.status(200)
          .send({ message: req.t('User updated!') });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error updating user!') });
    });
};

export const adminUserCreate = (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    password: hashSync(req.body.password, 8),
  })
    .then(() => {
      res.status(200)
        .send({ message: req.t('User created!') });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error creating user!') });
    });
};

export const adminUser = (req, res) => {
  User.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id,
        [Op.not]: req.userId,
      },
    },
    attributes: { exclude: ['password'] },
  })
    .then(
      (user) => {
        if (!user) {
          return res.status(404)
            .send({ message: req.t('User not found!') });
        }
        res.status(200)
          .send({ user });
      },
    )
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error getting user!') });
    });
};

export const adminUserList = (req, res) => {
  User.findAll({ attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'] })
    .then((users) => {
      res.status(200)
        .send({ users });
    })
    .catch(() => {
      res.status(500)
        .send({ message: req.t('Error getting user list!') });
    });
};
