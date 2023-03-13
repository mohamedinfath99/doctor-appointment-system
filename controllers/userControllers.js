import User from '../models/userModels.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



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
        const user = await User.findById({ _id: req.body.userId});
        user.password = undefined;

        if(!user){
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