import express from 'express';
import {
  createOrUpdateChat,
  getAllChats,
  getChatsByUserId,
  getMessagesByChatId,
  addMessageToChat
} from '../controllers/Chat.controller.js'; 

import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// console.log("Router get loaded");
// Route to create a new chat or append a message to an existing chat
router.post('/', createOrUpdateChat);

// Route to get all chats
router.get('/', authenticateToken, getAllChats);

// Route to get all chats related to a specific user ID
router.get('/user/:userId',authenticateToken, getChatsByUserId);

// Route to get all messages for a specific chat ID and user ID
router.get('/user/:id/:chatid',authenticateToken, getMessagesByChatId);

// Route to add a message to a specific chat ID
router.post('/user/:id/:chatid',authenticateToken, addMessageToChat);

export default router;
