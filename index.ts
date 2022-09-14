import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import session from 'express-session';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import loginRouter from './controllers/auth';
import documentsRouter from './controllers/document';
import usersRouter from './controllers/user';
import statsRouter from './controllers/statistic';
import errorHandler from './middlewares/errorHandler';
import './passport';
import swaggerDocument from './swagger.json';
import { PORT, SECRET, FRONTEND_URL } from './env';

const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(session({ secret: SECRET!, resave: true, saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', loginRouter);
app.use('/documents', documentsRouter);
app.use('/users', usersRouter);
app.use('/stats', statsRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));