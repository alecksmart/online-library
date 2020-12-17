import * as yup from 'yup';

export const name = (t) => yup.string()
  .min(3, t('Shelf Name is is too short!'))
  .required(t('Shelf Name is required!'));

export const description = (t) => yup.string()
  .min(5, t('Shelf Description is too short!'))
  .required(t('Shelf Description is required!'));
