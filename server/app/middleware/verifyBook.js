import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import {
  title,
  description,
  authorName,
  userId,
  shelfId,
} from '../validators/book';
import formatErrors from '../utils/formatErrors';

const verifyBookForAdmin = async (req, res, next) => {
  const shapeToCheck = {
    title: title(req.t),
    authorName: authorName(req.t),
    description: description(req.t),
    ShelfId: shelfId(req.t),
  };

  if (req.method === 'post') {
    shapeToCheck.UserId = userId(req.t);
  }

  const schema = yup.object()
    .shape(shapeToCheck);

  let errors = [];
  await schema.validate({
    ...req.body,
    userId: req.userId,
  },
  { abortEarly: false })
    .catch((err) => {
      errors = err;
    });

  if (!isEmpty(errors)) {
    res.status(400)
      .send({
        message: req.t('Book cannot be updated!'),
        errors: formatErrors(errors.inner),
      });
    return;
  }

  next();
};

export default { verifyBookForAdmin };
