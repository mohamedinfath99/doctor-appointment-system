import User from '../models/userModels.js';
import bycrypt from 'bcryptjs';



export const registerControllers = async (req, res) => {
    try {

        const exisitingUser = await User.findOne({email: req.body.email})

        if (exisitingUser){
            return res.status(200).send({ message: 'User Already Exist', success: false})
        }

        const password = req.body.password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt)
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



export const LoginControllers = () => { }