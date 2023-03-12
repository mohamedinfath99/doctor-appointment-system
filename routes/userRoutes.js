import express from 'express';
import { LoginControllers, registerControllers } from '../controllers/userControllers.js';


// router object
const router = express.Router()


// routes
router.post('/register', registerControllers)
router.post('/login', LoginControllers)


export default router;