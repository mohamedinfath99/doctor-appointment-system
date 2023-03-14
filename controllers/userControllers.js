import User from '../models/userModels.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor from '../models/doctorModel.js'



export const registerControllers = async (req, res) => {
    try {

        const exisitingUser = await User.findOne({ email: req.body.email })

        if (exisitingUser) {
            return res.status(200).send({ message: 'User Already Exist', success: false })
        }

        const password = req.body.password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save()

        res.status(201).send({ message: 'Register Sucessfully', success: true })

    }
    catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: `Register Controllers ${error.message}`
        })
    }
}





export const LoginControllers = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false })
        }

        const isMatch = await bycrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).send({ message: 'Login Success', success: true, token })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });

    }
}



export const authControllers = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.userId });
        user.password = undefined;

        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}

// apply
export const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await Doctor({ ...req.body, status: 'pending' });
        await newDoctor.save();

        const adminUser = await User.findOne({ isAdmin: true });
        const notification = adminUser.notification

        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastname} Has applied for a doctor account `,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastname,
                onClickPath: '/admin/doctors'
            }
        })

        await User.findByIdAndUpdate(adminUser._id, { notification })
        res.status(201).send({
            success: true,
            message: 'Doctor account applied Successfully'
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while applying for doctor'
        })
    }
}