import * as yup from 'yup';

export const firstName = (t) => yup.string()
  .min(3, t('First Name is is too short!'))
  .required(t('First Name is required!'));

export const lastName = (t) => yup.string()
  .min(3, t('Last Name is is too short!'))
  .required(t('First Name is required!'));

export const email = (t) => yup.string()
  .email(t('Incorrect email!'))
  .required(t('Email is required!'));

export const password = (t, confirm) => yup.string()
  .min(8, t('Password is too short!'))
  .max(32, t('Password is too long!'))
  .matches(/[0-9]/, t('Password must contain one or more numbers!'))
  .matches(/[a-z]/, t('Password must contain one or more lower case characters!'))
  .matches(/[A-Z]/, t('Password must contain one or more upper case characters!'))
  .matches(/\W|_/, t('Password must contain one or more special characters!'))
  .test('match',
    t('Passwords do not match!'),
    (v) => v === confirm)
  .required(t('Password is required!'));

export const isAdmin = (t) => yup.boolean()
  .required(t('Admin flag is required!'));
