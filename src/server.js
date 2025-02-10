import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import cookieParser from 'cookie-parser';

import { UPLOAD_DIR } from './constants/index.js';

// далі встановлюю порт
const PORT = process.env.PORT || 3000;

export function setupServer() {
  // створюю екземпляр сервера
  const app = express();

  // парсю
  app.use(express.json());

  // далі додаю мідлвари (середовище)
  app.use(cors());

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // app.use(contactsRouter);
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  //   і запускаю сервер
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use('/uploads', express.static(UPLOAD_DIR));
}
