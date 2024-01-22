/**
 * This module is created
 * To act as a middleware for handling exceptions 
 * inside of async express routes.
 * 
 * npm i express-async-handler --save
 * 
 */



import { schemaValidation } from '../library/helper.js'
import Employee from '../models/Employee.js'
// import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'
import { createUserSchema } from '../validation/schema/user.js'
import responseFuncs, { validationError } from '../utils/responseFuncs.js'
import { createUserObject } from '../entities/Entities.js'
import { user } from '../db/mongoDB/models/user.js'
import { responseHandler } from '../utils/responseHandler.js'
import { create } from '../db/access/userDB.js'
import { checkUniqueFieldsInDatabase } from '../utils/checkUniqueFieldsInDatabase.js'
import userDb from '../db/access/userDBManager.js'
// import logger from '../utils/Logger.js'
//getUsers function to get all users
export const getUsers = asyncHandler(async (req, res) => {
    const users = await user.find({})
    res.json(users)
})

/**
 * GET USER BY {id}
 */
export const getUserById = asyncHandler(async (req, res) => {
    const user = await user.findById(req.params.id)

    //if user id match param id send user else throw error
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
        res.status(404)
        throw new Error('User not found')
    }
})

/**
 * REGISTER API
 */
export const register = async (req, res) => {
    console.log('tj_ Register API reqJson', req.body)
    // Employee.create(req.body)
    //     .then(employees => res.json(employees))
    //     .catch(err => res.json(err))

    const { name, email, password, contactNumber } = req.body;

    // req.body.email = email.toLowerCase();

    const responseJSON = {
        status: undefined,
        message: undefined,
        data: undefined,
    }

    const existingUser = await Employee.findOne({ email });
    console.log('what is existingUser = ', existingUser)

    await Employee.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.email === email) {

                    responseJSON.status = "200"
                    // responseJSON.message = "User to jana Pehchana hain USER_ALREADY_EXIST"
                    responseJSON.message = "User already registered, Try login instead."
                    // res.json('User already exist')
                    // res.json(responseJSON)
                    // res.json('User jana pehchana hain')
                    // res.json('User jana pehchana hain',user)

                    // res.writeContinue()

                    res.json(JSON.parse(JSON.stringify(responseJSON)))
                } else {
                    console.log('new email found')
                }
            } else {
                console.log('this is new user i am adding to db')
                Employee.create(req.body)
                    .then(employee => {
                        responseJSON.status = "201"
                        responseJSON.message = "You registered successfully."
                        responseJSON.data = employee
                        // res.json(responseJSON)

                        res.json(JSON.parse(JSON.stringify(responseJSON)))

                    })
                    .catch(err => res.json(err))
            }

            // RETURN Response - Surprisingly Not reaching here too :(
            // res.json(JSON.parse(JSON.stringify(responseJSON)))
        })

    // RETURN Response - Not reaching here
    // res.json(JSON.parse(JSON.stringify(responseJSON)))


}

/**
 * LOGIN API
 */
export const login = async (req, res) => {

    const responseJSON = {
        status: undefined,
        message: undefined,
        // data : undefined,
        data: {},
        // data : {
        //     id : undefined
        // },
    }

    const { email, password } = req.body;
    Employee.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log('tj_ login found user = ', user)
                if (user.password === password) {
                    responseJSON.status = "200"
                    responseJSON.message = "Login successful on new route."
                    responseJSON.data.id = user.id

                    // responseJSON.data['id'] = user.id
                    // responseJSON['id'] = user.id


                    // res.json('Login is successfull')
                } else {
                    responseJSON.status = "failed"
                    responseJSON.message = "Incorrect Password."
                    // res.json('password is wrong')
                }

                // res.json(JSON.parse(JSON.stringify(responseJSON)))

            } else {
                // res.json('this is new user , register please')
                responseJSON.status = "failed"
                responseJSON.message = "User not found, Please register first."

                // res.json(JSON.parse(JSON.stringify(responseJSON)))

            }

            res.json(JSON.parse(JSON.stringify(responseJSON)))

        })

    // Employee.create(req.body)
    //     .then(employees => res.json(employees))
    //     .err(err => res.json(err))
}

export const createUser = asyncHandler(async (req, res) => {

    let dataToCreate = { ...req.body || {} };
    let newUser = createUserObject(dataToCreate);
    console.log('In userController dataToCreate = ', dataToCreate)

    let result;

    try {

        const validateRequest = schemaValidation(createUserSchema)(dataToCreate);
        let checkUniqueFields = await checkUniqueFieldsInDatabase(userDb)(['email'], newUser, 'INSERT');


        // let checkUniqueFields = await checkUniqueFieldsInDatabase(userDb)([ 'email' ],newUser,'INSERT');

        // let checkUniqueFieldsInDB = checkUniqueFieldsInDatabase(userDb);
        // let checkUniqueFields = await checkUniqueFieldsInDB(['email'], newUser, 'INSERT');


        // let checkUniqueFields = checkUniqueFieldsInDatabase(userDb)(['email'], newUser, 'INSERT');
        // let checkUniqueFields = checkUniqueFieldsInDatabase(userDb)(['phone'], newUser, 'INSERT');
        // let checkUniqueFields = await checkUniqueFieldsInDB(['email'], newUser, 'INSERT');

        debugger

        if (!validateRequest.isValid) {
            result = responseFuncs.validationError({ message: `Invalid values in params , ${validateRequest.message}` });
            console.log('In userController Schema_validationError IF result = ', result)
        } else if (checkUniqueFields.isDuplicate) {
            result = responseFuncs.validationError({ message: `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
            console.log('In userController checkUniqueFields_validationError ELSE IF checkUniqueFields = ', checkUniqueFields)
            console.log('In userController checkUniqueFields_validationError ELSE IF result = ', result)
        } else {
            // let newUser = createUserObject(dataToCreate);
            // var user = await create(newUser);
            // result = responseFuncs.success({ data: user });


            console.log('In userController validationError ELSE checkUniqueFields = ', checkUniqueFields)
            console.log('In userController validationError ELSE newUser createUserObject = ', newUser)
            newUser = await create(newUser);
            console.log('In userController validationError ELSE newUser = ', newUser)
            result = responseFuncs.success({ data: newUser });
            console.log('In userController validationError ELSE result = ', result)
        }

        // console.warn('In userController responseHandler = ', responseHandler(res, result))

        return responseHandler(res, result);

    } catch (error) {
        console.log('In userController error = ', error)
        return responseHandler(res,
            responseFuncs.internalServerError({ message: error.message })
        )
    }

}

)