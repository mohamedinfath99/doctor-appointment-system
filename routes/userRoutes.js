import express from 'express';
import { LoginControllers, registerControllers, authControllers, applyDoctorController, getAllNotificationController, deleteAllNotificationController } from '../controllers/userControllers.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';


// Router object
const router = express.Router()


// Routes
router.post('/register', registerControllers)
router.post('/login', LoginControllers)


// Auth 
router.post('/getUserData', authMiddlewares, authControllers)


// Apply doctor
router.post('/apply-doctor', authMiddlewares, applyDoctorController)

// Notification doctor
router.post('/get-all-notification', authMiddlewares, getAllNotificationController)


// Notification doctor
router.post('/delete-all-notification', authMiddlewares, deleteAllNotificationController)

export default router;