// const express = require('express')

// import connectDB from "./config/db";
// import dotenv  from 'dotenv'

// dotenv.config()
// connectDB()

import userRoutes from './routes/userRoute.js'
// import { connectDB } from './config/db'
import {connectDB} from './config/db.js'
import employeesRouter from './routes/employeeRoute.js'
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
app.use(express.json())
app.use(cors())

//Creating API for user
app.use('/api/users', userRoutes)

//Creating API for user
app.use('/api/employees', employeesRouter)


const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))

// // Register API
// app.post('/register', async (req, res) => {
//     console.log('tj_ Register API reqJson', req.body)
//     // Employee.create(req.body)
//     //     .then(employees => res.json(employees))
//     //     .catch(err => res.json(err))

//     const { name, email, password, contactNumber } = req.body;

//     // req.body.email = email.toLowerCase();

//     const responseJSON = {
//         status: undefined,
//         message: undefined,
//         data: undefined,
//     }

//     const existingUser = await Employee.findOne({ email });
//     console.log('what is existingUser = ', existingUser)

//     await Employee.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.email === email) {

//                     responseJSON.status = "200"
//                     // responseJSON.message = "User to jana Pehchana hain USER_ALREADY_EXIST"
//                     responseJSON.message = "User already registered, Try login instead."
//                     // res.json('User already exist')
//                     // res.json(responseJSON)
//                     // res.json('User jana pehchana hain')
//                     // res.json('User jana pehchana hain',user)

//                     // res.writeContinue()

//                     res.json(JSON.parse(JSON.stringify(responseJSON)))
//                 } else {
//                     console.log('new email found')
//                 }
//             } else {
//                 console.log('this is new user i am adding to db')
//                 Employee.create(req.body)
//                     .then(employee => {
//                         responseJSON.status = "201"
//                         responseJSON.message = "You registered successfully."
//                         responseJSON.data = employee
//                         // res.json(responseJSON)

//                         res.json(JSON.parse(JSON.stringify(responseJSON)))

//                     })
//                     .catch(err => res.json(err))
//             }

//             // RETURN Response - Surprisingly Not reaching here too :(
//             // res.json(JSON.parse(JSON.stringify(responseJSON)))
//         })

//     // RETURN Response - Not reaching here
//     // res.json(JSON.parse(JSON.stringify(responseJSON)))


// })

// // login API
// app.post("/login", (req, res) => {

//     const responseJSON = {
//         status: undefined,
//         message: undefined,
//         // data : undefined,
//         data: {},
//         // data : {
//         //     id : undefined
//         // },
//     }

//     const { email, password } = req.body;
//     Employee.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 console.log('tj_ login found user = ', user)
//                 if (user.password === password) {
//                     responseJSON.status = "200"
//                     responseJSON.message = "Login successful."
//                     responseJSON.data.id = user.id

//                     // responseJSON.data['id'] = user.id
//                     // responseJSON['id'] = user.id


//                     // res.json('Login is successfull')
//                 } else {
//                     responseJSON.status = "failed"
//                     responseJSON.message = "Incorrect Password."
//                     // res.json('password is wrong')
//                 }

//                 // res.json(JSON.parse(JSON.stringify(responseJSON)))

//             } else {
//                 // res.json('this is new user , register please')
//                 responseJSON.status = "failed"
//                 responseJSON.message = "User not found, Please register first."

//                 // res.json(JSON.parse(JSON.stringify(responseJSON)))

//             }

//             res.json(JSON.parse(JSON.stringify(responseJSON)))

//         })

//     // Employee.create(req.body)
//     //     .then(employees => res.json(employees))
//     //     .err(err => res.json(err))
// })

