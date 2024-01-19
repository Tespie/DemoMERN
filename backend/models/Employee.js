import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    contactNumber : String
})

const Employee = new mongoose.model('Employee',employeeSchema)


export default Employee;
