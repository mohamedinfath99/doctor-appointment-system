import Doctor from '../models/doctorModel.js';
import User from '../models/userModels.js';


export const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).send({
            success: true,
            message: 'Users data list',
            data: users
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching users data",
            error
        })
    }
}



export const getAllDoctorController = async (req, res) => {
    try {
        const doctors = await Doctor.find({});

        res.status(200).send({
            success: true,
            message: 'Doctors data list',
            data: doctors
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching doctors data",
            error
        })
    }
}



export const changeAccountStatusController = async (req, res) => {
    try {

        const { doctorId, status } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {status});
        const user = await User.findOne({_id: doctor.userId}); 
        const notification = user.notification;

        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your doctor account request has ${status}`,
            onClickPath: '/notification'
        })

        user.isDoctor = status === "approved" ? true : false;
        await user.save();
        
        res.status(201).send({
            success: true,
            message: 'Account status updated',
            data: doctor
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in account status',
            error
        })
    }
}