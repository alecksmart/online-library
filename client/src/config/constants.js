import setActionNames, { valueToLower } from 'utils/setActionNames';
import { getLocationPathName } from 'config/utils';

export const PAGES = {
  ROOT: '/',
  ...setActionNames([
    'ERROR',
    'LOGIN',
    'LOGOUT',
  ], (v) => getLocationPathName(valueToLower(v))),
};

export const ENVS = setActionNames([
  'PRODUCTION',
  'DEVELOPMENT',
  'TEST',
], valueToLower);

export const EDIT_MODE = setActionNames(['CREATE', 'UPDATE']);

export const TOASTS = setActionNames(['ERROR', 'INFO'], valueToLower);

export const DEFAULT_PAGE_SIZE = 24;

export const BOOKS_ORDER_BY = [
  { value: 'createdAt', label: 'Recently added' },
  { value: 'authorName', label: 'Author name' },
  { value: 'title', label: 'Title' },
  { value: 'shelf', label: 'Shelf' },
];
