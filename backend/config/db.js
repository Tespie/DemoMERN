import mongoose from 'mongoose'
// import user from '../models/usersModel.js'

// import User from '../models/usersModel.js';

// const connectDB = async () => {
export const connectDB = async () => {
    try {
        //database Name
        const databaseName = 'demomern';

        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
            useNewUrlParser: true, // Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
            useUnifiedTopology: true, // [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
            // useCreateIndex: true,    //Error: option usecreateindex is not supported
            // user : User // tj added this by himself and so removed as getting one error
        });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`DB Error: ${error.message}`)
        process.exit(1)
    }
}

// export default connectDB;