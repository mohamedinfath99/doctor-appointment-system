import express from 'express';
import { getDoctorInfoController, updateProfileController } from '../controllers/doctorControllers.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';


// Router object
const router = express.Router()

router.post('/getDoctorInfo', authMiddlewares, getDoctorInfoController);

router.post('/updateProfile', authMiddlewares, updateProfileController)

export default router;