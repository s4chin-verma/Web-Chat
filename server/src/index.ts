import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import setupSocket from './config/socket';

dotenv.config();
const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI as string;

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error', (error: Error) => {
  console.log(error);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is Running');
});

setupSocket(server);

server.listen(port, () => {
  console.log(`Server Start Listening on port ${port}`);
});

app.use('/', router());
