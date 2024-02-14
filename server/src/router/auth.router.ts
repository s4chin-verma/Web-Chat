import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers';
import { auth } from '../middleware';

export default (router: express.Router) => {
  router.post('/api/user/register', register);
  router.post('/api/user/login', login);
  router.post('/api/user/reset-password', forgotPassword);
  router.put('/api/user/reset-password', auth, resetPassword);
};
