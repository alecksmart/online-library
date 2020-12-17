import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import {
  name,
  description,
} from '../validators/shelf';
import formatErrors from '../utils/formatErrors';

const verifyShelfForAdmin = async (req, res, next) => {
  const schema = yup.object()
    .shape({
      name: name(req.t),
      description: description(req.t),
    });

  let errors = [];
  await schema.validate(req.body, { abortEarly: false })
    .catch((err) => {
      errors = err;
    });

  if (!isEmpty(errors)) {
    res.status(400)
      .send({
        message: req.t('Shelf cannot be updated!'),
        errors: formatErrors(errors.inner),
      });
    return;
  }

  next();
};

export default { verifyShelfForAdmin };
