import express from 'express';
import {
  createOrUpdateChat,
  getAllChats,
  getChatsByUserId,
  getMessagesByChatId,
  addMessageToChat
} from '../controllers/Chat.controller.js'; 


const router = express.Router();

// Route to create a new chat or append a message to an existing chat
router.post('/', createOrUpdateChat);

// Route to get all chats
router.get('/', getAllChats);

// Route to get all chats related to a specific user ID
router.get('/user/:userId', getChatsByUserId);

// Route to get all messages for a specific chat ID and user ID
router.get('/user/:id/:chatid', getMessagesByChatId);

// Route to add a message to a specific chat ID
router.post('/user/:id/:chatid', addMessageToChat);

export default router;
