import asyncHandler from "express-async-handler"
import userDb from "../db/access/userDBManager.js";
import { checkUniqueFieldsInDatabase } from "../utils/checkUniqueFieldsInDatabase.js";
import responseFuncs from "../utils/responseFuncs.js";
import { responseHandler } from "../utils/responseHandler.js";
import { createUserSchema } from "../validation/schema/user.js";
import { createUserObject } from "../entities/Entities.js";
import { schemaValidation } from "../library/helper.js";
/**
 * REGISTER api
 */
export const register = asyncHandler(async (req, res) => {

    let dataToCreate = { ...req.body || {} };
    let newUser = createUserObject(dataToCreate);
    console.log('authController register newUser = ', newUser)

    let result;

    try {

        const validateRequest = schemaValidation(createUserSchema)(dataToCreate);
        let checkUniqueFields = await checkUniqueFieldsInDatabase(userDb)(['email'], newUser, 'INSERT');


        if (!validateRequest.isValid) {

            result = responseFuncs.validationError({ message: `Invalid values in params , ${validateRequest.message}` });
            console.log('authController Schema_validationError IF result = ', result)

        } else if (checkUniqueFields.isDuplicate) {

            result = responseFuncs.validationError({ message: `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
            console.log('authController checkUniqueFields_validationError ELSE IF result = ', result)

        } else {

            // newUser = await create(newUser);
            newUser = await userDb.create(newUser);
            result = responseFuncs.success({ data: newUser });
            console.log('authController validationError ELSE result = ', result)
        }

        return responseHandler(res, result);

    } catch (error) {
        console.log('authController error = ', error)
        return responseHandler(res,
            responseFuncs.internalServerError({ message: error.message })
        )
    }

}

)

/**
 * LOGIN api
 */
export const login = asyncHandler(async (req, res) => {

    let dataToCreate = { ...req.body || {} };

    let {
        email, password
    } = dataToCreate;

    console.log('authController_login dataToCreate = ', dataToCreate);

    let result;

    try {

        if (!email || !password) {
            result = responseFuncs.badRequest({ message: 'Insufficient request parameters! email and password is required.' });
            console.log('authController_login noEmail or noPassword');
            return responseHandler(res, result);
        }

        let where = { 'email': email };
        // where.isDeleted = false; // tj's app don't need this right now :)

        let user = await userDb.findOne(where);
        console.log('authController_login found user = ', user);
        if (user) {

            //TODO : Check why isPasswordMatch is not called ?
            // const isPasswordMatched = await user.isPasswordMatch(password);

            const isPasswordMatched = user.password === password

            if (!isPasswordMatched) {
                console.log('authController_login Incorrect password  = ', user);
                result = responseFuncs.badRequest({ message: 'Incorrect password' });
                // if we change this to return success instead of badRequest then this will work.
            } else {

                const userData = user.toJSON();

                result = responseFuncs.success({
                    data: userData,
                    message: 'Login Successful'
                });

                console.log('authController_login success result userData = ', userData);
            }

        } else {
            result = responseFuncs.badRequest({ message: 'User not exists' });
            console.log('authController_login user not found = ', user);
        }

        return responseHandler(res, result);

    } catch (error) {
        console.log('authController_login error = ', error)
        return responseHandler(res,
            responseFuncs.internalServerError({ message: error.message })
        )
    }

}

)