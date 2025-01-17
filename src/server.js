import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
// імпорт мідлварів
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// далі встановлюю порт
const PORT = process.env.PORT || 3000;

export function setupServer() {
  // створюю екземпляр сервера
  const app = express();

  // парсю
  app.use(express.json());

  // далі додаю мідлвари (середовище)
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  //   і запускаю сервер
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
