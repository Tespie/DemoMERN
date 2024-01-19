import joi from 'joi';

export const createUserSchema = joi.object({
    // username: joi.string().allow(null).allow(''),
    // username: joi.string(), 
    email: joi.string().allow(null).allow(''),
    phone: joi.string().allow(null).allow(''),
    password: joi.string().allow(null).allow('')
}).unknown(true);


// export const createUserSchema = joi.object({
//     password: joi.string().allow(null).allow(''),
//     email: joi.string().allow(null).allow(''),
//     userType: joi.number().allow(0),
//     isActive: joi.boolean(),
//     isDeleted: joi.boolean(),
//     mobileNo: joi.string().allow(null).allow(''),
//     resetPasswordLink: joi.object({
//         code: joi.string(),
//         expireTime: joi.date().options({ convert: true })
//     })
// }).unknown(true);