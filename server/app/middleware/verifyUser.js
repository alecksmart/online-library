import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import db from '../models';
import {
  firstName,
  lastName,
  email,
  password,
  isAdmin,
} from '../validators/user';
import formatErrors from '../utils/formatErrors';

const { User } = db;

const verifyUserFull = (req, res, next) => {
  User.findOne({ where: { email: req.body.email || null } })
    .then(async (entry) => {
      if (entry) {
        res.status(400)
          .send({ message: req.t('Account not created! Email is already in use!') });
        return;
      }

      const schema = yup.object()
        .shape({
          firstName: firstName(req.t),
          lastName: lastName(req.t),
          email: email(req.t),
          password: password(req.t, req.body.confirmPassword),
        });

      let errors = [];
      await schema.validate(req.body, { abortEarly: false })
        .catch((err) => {
          errors = err;
        });

      if (!isEmpty(errors)) {
        res.status(400)
          .send({
            message: req.t('Account not created!'),
            errors: formatErrors(errors.inner),
          });
        return;
      }

      next();
    });
};

const verifyUserForUpdate = async (req, res, next) => {
  let shape = {
    firstName: firstName(req.t),
    lastName: lastName(req.t),
  };
  if (req.body.password > '') {
    shape = {
      ...shape, password: password(req.t, req.body.confirmPassword),
    };
  }
  const schema = yup.object()
    .shape(shape);

  let errors = [];
  await schema.validate(req.body, { abortEarly: false })
    .catch((err) => {
      errors = err;
    });

  if (!isEmpty(errors)) {
    res.status(400)
      .send({
        message: req.t('Account cannot be updated!'),
        errors: formatErrors(errors.inner),
      });
    return;
  }

  next();
};

const verifyUserForAdmin = async (req, res, next) => {
  if (req.method === 'POST') {
    const count = await User.count({ where: { email: req.body.email } })
      .then((c) => c);
    if (count > 0) {
      res.status(400)
        .send({ message: req.t('Account not created! Email is already in use!') });
      return;
    }
  }

  const validationSchema = {
    email: email(req.t),
    firstName: firstName(req.t),
    lastName: lastName(req.t),
    isAdmin: isAdmin(req.t),
  };
  // password check for update if it is > ''
  if (req.method === 'POST' || (req.method === 'PUT' && req.body.password > '')) {
    validationSchema.password = password(req.t, req.body.confirmPassword);
  }

  const schema = yup.object()
    .shape(validationSchema);

  let errors = [];
  await schema.validate(req.body, { abortEarly: false })
    .catch((err) => {
      errors = err;
    });

  if (!isEmpty(errors)) {
    res.status(400)
      .send({
        message: req.t('Account cannot be updated!'),
        errors: formatErrors(errors.inner),
      });
    return;
  }

  next();
};

export default {
  verifyUserFull,
  verifyUserForUpdate,
  verifyUserForAdmin,
};
