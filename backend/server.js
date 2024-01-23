// const express = require('express')

// import connectDB from "./config/db";
// import dotenv  from 'dotenv'

// dotenv.config()
// connectDB()

import userRoutes from './routes/userRoute.js'
// import { connectDB } from './config/db'
import { connectDB } from './config/db.js'
import employeesRouter from './routes/employeeRoute.js'
import authRouter from './routes/authRoutes.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Employee from './models/Employee.js'

//connect database
// connectDB()

connectDB()

//dotenv config
dotenv.config()

//express configuration
const app = express()

// express Router - You CAN't use Router directly, Use app.router :) 😎
// const router = express.Router();

app.use(express.json())
app.use(cors())

// Authentication APIs
// router.use('/api/auth', authRouter); // THIS WILL NEVER WORK 🎆
app.use('/api/auth', authRouter);

//Creating API for user
app.use('/api/users', userRoutes)

//Creating API for employees
app.use('/api/employees', employeesRouter)


const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
