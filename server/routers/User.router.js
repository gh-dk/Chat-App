import express from 'express';
import { createUser, getAllUsers,loginUser,resetPassword ,sendResetPasswordEmail} from '../controllers/User.controller.js'; // Make sure to use the correct path

const router = express.Router();

// Route to create a new user
router.post('/', createUser);

// Route to get all users
router.get('/', getAllUsers);

// Route for user login
router.post('/login', loginUser);

// Route to send reset password email
router.post('/send-reset-password-email', sendResetPasswordEmail);

// Route to reset password
router.post('/reset-password', resetPassword);

export default router;
