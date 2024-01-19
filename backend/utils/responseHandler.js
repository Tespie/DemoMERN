// import { responseCode } from "./responseCode";

const responseCode = {
    success: 200,
    badRequest: 400,
    internalServerError: 500,
    unAuthorized: 401,
    validationError: 422,
};

// module.exports = (res, body = {}) => {
export const responseHandler = (res, body = {}) => {
    const headers = body.headers || { 'Content-Type': 'application/json' };
    let statusCode;

    switch (body.status) {
        case 'SUCCESS':
            statusCode = body.statusCode || responseCode.success;
            break;
        case 'FAILURE':
            statusCode = body.statusCode || responseCode.success;
            break;
        case 'SERVER_ERROR':
            statusCode = body.statusCode || responseCode.internalServerError;
            break;
        case 'BAD_REQUEST':
            statusCode = body.statusCode || responseCode.badRequest;
            break;
        case 'RECORD_NOT_FOUND':
            statusCode = body.statusCode || responseCode.success;
            break;
        case 'VALIDATION_ERROR':
            statusCode = body.statusCode || responseCode.validationError;
            break;
        case 'UNAUTHORIZED':
            statusCode = body.statusCode || responseCode.unAuthorized;
            break;
        default:
            statusCode = responseCode.internalServerError;
    }
    // return res.set(headers).status(statusCode).send(body);
    return res.status(statusCode).send(body);
};
