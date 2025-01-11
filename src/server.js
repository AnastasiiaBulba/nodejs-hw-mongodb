import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export function setupServer() {
  // створюю екземпляр сервера
  const app = express();

  // далі додаю мідлвари (середовище)
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // обробляю маршрути які не існують
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // далі встановлюю порт
  const PORT = process.env.PORT || 3000;

  //   і запускаю сервер
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
