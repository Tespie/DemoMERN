import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const schema = new Schema({
    // username: { type: String, unique: true },

    email: { type: String },
    // email: { type: String, unique: true },

    phone: { type: String },
    password: { type: String },
});

export const user = mongoose.model('user', schema);
// module.exports = user;

// export default user;
