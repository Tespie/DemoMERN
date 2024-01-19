export const createUserObject = (user) => {
    let newUser = {
        email: user.email,
        phone: user.phone,
        password: user.password,
        // userType: user.userType,
        // isActive: user.isActive,
        // isDeleted: user.isDeleted,
        // mobileNo: user.mobileNo,
        // resetPasswordLink: user.resetPasswordLink,
        // loginRetryLimit: user.loginRetryLimit,
        // loginReactiveTime: user.loginReactiveTime,
    };

    // remove undefined values
    Object.keys(newUser).forEach(key => newUser[key] === undefined && delete newUser[key]);

    // To validate Entity uncomment this block
    /*
     * const validate = (newUser) => {
     *   if (!newUser.field) {
     *       throw new Error("this field is required");
     *   }
     * }
     * validate(newUser) 
     */

    return Object.freeze(newUser);
};
