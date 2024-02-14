import express from 'express';
import authentication from './auth.router';
import users from './chat.router';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  return router;
};
