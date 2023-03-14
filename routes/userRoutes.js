import express from 'express';
import { LoginControllers, registerControllers, authControllers, applyDoctorController } from '../controllers/userControllers.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';


// router object
const router = express.Router()


// routes
router.post('/register', registerControllers)
router.post('/login', LoginControllers)


// Auth || Post
router.post('/getUserData', authMiddlewares, authControllers)


// apply doctor || Post
router.post('/apply-doctor', authMiddlewares, applyDoctorController)

export default router;