import express from 'express';
import { getAllUsers, loginUser, refreshAccessToken, registerUser, verifyToken } from '../controllers/User.controller.js';

const router = express.Router();

// Register User
router.post('/',registerUser);

// Get all Users
router.get('/', getAllUsers);

// Login User
router.post('/login',loginUser);

// RefreshToken
router.post('/refresh-token',refreshAccessToken)

// VerifyToken
router.get('/verify-token',verifyToken);

export default router;