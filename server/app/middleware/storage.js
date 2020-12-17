import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { booksPath } from '../config/common';

const imgStorage = multer.diskStorage({
  destination: booksPath,
  filename(req, file, cb) {
    cb(null, `${uuidv4()}.jpg`);
  },
});

export const imgUpload = multer({
  storage: imgStorage,
  limits: { fileSize: 10000000 },
});

const pdfStorage = multer.diskStorage({
  destination: booksPath,
  filename(req, file, cb) {
    cb(null, `${uuidv4()}.pdf`);
  },
});

export const pdfUpload = multer({
  storage: pdfStorage,
  limits: { fileSize: 10000000 },
});
