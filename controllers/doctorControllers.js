import Doctor from '../models/doctorModel.js'




export const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId});
        res.status(200).send({
            success: true,
            message: 'Doctor data fetch success',
            data: doctor
        });
    } 
    catch (error) {
     console.log(error);
     res.status(500).send({
        success: false,
        error,
        message: 'Error in fetching doctor details'
     })   
    }
}



export const updateProfileController = () => {}