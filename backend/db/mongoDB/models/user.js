import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const schema = new Schema({
    // username: { type: String, unique: true },
    // email: { type: String, unique: true },
    // phone: { type: String },

    username: { type: String },
    email: { type: String },
    password: { type: String },
});

/**
 * You can add your schema.pre & schema.post Functions
 */
//...........
//...........


schema.methods.isPasswordMatch = async function (password) {
    // const user = this;
    // return bcrypt.compare(password, user.password);
    return this.password === password;
};


schema.method('toJSON', function () {
    const {
        _id, __v, ...object
    } = this.toObject({ virtuals: true });
    object.id = _id;
    delete object.password;
    return object;
});














export const user = mongoose.model('user', schema);


/**
 * DONT USE module / default EXPORT syntax 💣
 */
// module.exports = user;
// export default user;
