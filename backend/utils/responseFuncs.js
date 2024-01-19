// import { responseStatus } from "./responseStatus";

// import responseStatus from "./responseStatus";

const responseStatus = {
    success: 'SUCCESS',
    failure: 'FAILURE',
    serverError: 'SERVER_ERROR',
    badRequest: 'BAD_REQUEST',
    recordNotFound: 'RECORD_NOT_FOUND',
    validationError: 'VALIDATION_ERROR',
    unauthorized: 'UNAUTHORIZED',
};

export const success = (data = {}) => ({
    status: responseStatus.success,
    message: data.message || 'Your request is successfully executed',
    data: data.data && Object.keys(data.data).length ? data.data : null,
});

export const failure = (data = {}) => ({
    status: responseStatus.failure,
    message: data.message || 'Some error occurred while performing action.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
});

export const internalServerError = (data = {}) => ({
    status: responseStatus.serverError,
    message: data.message || 'Internal server error.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
});

export const badRequest = (data = {}) => ({
    status: responseStatus.badRequest,
    message: data.message || 'The request cannot be fulfilled due to bad syntax.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
});

export const recordNotFound = (data = {}) => ({
    status: responseStatus.recordNotFound,
    message: data.message || 'Record(s) not found with specified criteria.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
});

export const validationError = (data = {}) => ({
    status: responseStatus.validationError,
    message: data.message || `Invalid Data, Validation Failed.`,
    data: data.data && Object.keys(data.data).length ? data.data : null,
});

export const unAuthorized = (data = {}) => ({
    status: responseStatus.unauthorized,
    message: data.message || 'You are not authorized to access the request',
    data: data.data && Object.keys(data.data).length ? data.data : null,
});

export default {
    success,
    failure,
    internalServerError,
    badRequest,
    recordNotFound,
    validationError,
    unAuthorized,
}