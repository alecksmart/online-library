import * as yup from 'yup';

export const title = (t) => yup.string()
  .min(1, t('Book Title is too short!'))
  .required(t('Book Title is required!'));

export const description = (t) => yup.string()
  .min(5, t('Book Description is too short!'))
  .required(t('Book Description is required!'));

export const authorName = (t) => yup.string()
  .min(5, t('Author Name is is too short!'))
  .required(t('Author Name is required!'));

export const userId = (t) => yup.number()
  .required(t('Please login!'));

export const shelfId = (t) => yup.number()
  .required(t('Shelf is required!'));
