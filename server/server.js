import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import i18next from 'i18next';
import { LanguageDetector, handle } from 'i18next-express-middleware';
import i18nextConfig from './app/config/i18n.config';

import libraryRoutes from './app/routes/library.routes';
import authRoutes from './app/routes/auth.routes';
import userRoutes from './app/routes/user.routes';
import adminUserRoutes from './app/routes/admin/user.routes';
import adminShelfRoutes from './app/routes/admin/shelf.routes';
import adminBookRoutes from './app/routes/admin/book.routes';

const app = express();
const PORT = process.env.PORT || 3001;
i18next.use(LanguageDetector)
  .init(i18nextConfig);
app.use(handle(i18next));

const corsOptions = { origin: 'http://localhost:3000' };

// eslint-disable-next-line no-unused-vars
const jsonErrorHandler = async (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(500);
  res.send(JSON.stringify(err));
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(jsonErrorHandler);

libraryRoutes(app);
authRoutes(app);
userRoutes(app);
adminUserRoutes(app);
adminShelfRoutes(app);
adminBookRoutes(app);

app.get('/', (req, res) => {
  res.json({ message: req.t('Welcome to online library application!') });
});

app.all('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(404);
  res.send({ message: req.t('Resource not found') });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
