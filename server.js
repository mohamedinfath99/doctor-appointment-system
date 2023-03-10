import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connect from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'


// dotenv config
dotenv.config();


const app = express();


// middleware
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/doctor', doctorRoutes)


//listen port
const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect();
    console.log(`Server is running ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgYellow.black);
})