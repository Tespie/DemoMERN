/**
 * 
 * @param {schema} 
 * @returns true if schema is valid otherwise false and message
 */
const schemaValidation = (schema) => (data) => {
    const { error } = schema.validate(data, {
        abortEarly: false,
        convert: false,
    });
    if (error) {
        const message = error.details.map((el) => el.message).join('\n');
        return {
            isValid: false,
            message,
        };
    }
    return { isValid: true };
};

export default schemaValidation;
