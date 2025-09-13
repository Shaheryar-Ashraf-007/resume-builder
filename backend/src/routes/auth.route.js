import express from 'express';
import { Login, Logout, Profile, Signup } from '../controllers/auth.controller.js';
import { protectRoutes } from '../middleware/auth.middleware.js';
import { uploadImages } from '../controllers/uploadImages.js';
import { uploadMiddleware } from '../middleware/upload.middleware.js';
const router = express.Router();

router.post('/signup', Signup)
router.get('/profile',protectRoutes, Profile)
router.post('/login', Login);
router.post('/logout', Logout)


export default router;