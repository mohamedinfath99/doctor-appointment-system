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