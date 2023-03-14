import express from 'express';
import { getAllDoctorController, getAllUsersController, changeAccountStatusController } from '../controllers/adminControllers.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';


// Router object
const router = express.Router()


//Get users list
router.get('/getAllUsers', authMiddlewares, getAllUsersController);


//Get doctors list
router.get('/getAllDoctors', authMiddlewares, getAllDoctorController)


//Account status 
router.post('/changeAccountStatus', authMiddlewares, changeAccountStatusController)



export default router;