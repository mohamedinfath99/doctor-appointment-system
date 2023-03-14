import express from 'express';
import { getAllDoctorController, getAllUsersController } from '../controllers/adminControllers.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';


// Router object
const router = express.Router()

router.get('/getAllUsers', authMiddlewares, getAllUsersController);


router.get('/getAllDoctors', authMiddlewares, getAllDoctorController)


export default router;