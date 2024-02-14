import express from 'express';
import { getOrCreateConversation, addMessageToConversation } from '../controllers/msg.controller';
import { getAllUsers } from '../controllers';
import { auth } from '../middleware';

export default (router: express.Router) => {
  router.get('/api/chat/users', auth, getAllUsers);
  router.post('/api/chat/conversations', auth, getOrCreateConversation);
  router.put('/api/chat/conversations/:conversationId', auth, addMessageToConversation);
};
