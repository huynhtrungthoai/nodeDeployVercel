import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';

import UserRouter from './routes/userRoute';
import AuthRouter from './routes/authRoute';

import { AppDataSource } from './db';

const app = express();

app.use(bodyParser.json());

app.use(UserRouter);
app.use(AuthRouter);

AppDataSource.connect()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on ${process.env.NODE_ENV}  port ${process.env.PORT || 3000}`);
        });
    })
    .catch((err: Error) => {
        console.error(err.message);
    });
