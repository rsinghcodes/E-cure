import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import logger from 'morgan';

import connect from './database/connect';
import admin from './routes/admin';
import patient from './routes/patient';
import doctor from './routes/doctor';
import common from './routes/common';
import { MONGODB } from './config';

const app: Application = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/', common);
app.use('/api/admin', admin);
app.use('/api/patient', patient);
app.use('/api/doctor', doctor);

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Server running successfully...');
});

app.listen(PORT, async () => {
  console.log(`🚀  Server ready at ${PORT}`);
  await connect({ db: MONGODB! });
});
