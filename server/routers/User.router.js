// User.router.js
import express from 'express';
import {
  createUser,
  getAllUsers,
  loginUser,
  sendResetPasswordEmail,
  resetPassword,
  refreshAccessToken,
} from '../controllers/User.controller.js';

const router = express.Router();

// Route to create a new user
router.post('/', createUser);

// Route to get all users (protected route)
router.get('/', getAllUsers);

// Route for user login
router.post('/login', loginUser);

// Route to refresh access token
router.post('/refresh-token', refreshAccessToken);

// Route to send reset password email
router.post('/send-reset-password-email', sendResetPasswordEmail);

// Route to reset password
router.post('/reset-password', resetPassword);

export default router;
