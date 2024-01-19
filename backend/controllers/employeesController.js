/**
 * This module is created
 * To act as a middleware for handling exceptions 
 * inside of async express routes.
 * 
 * npm i express-async-handler --save
 * 
 */



import Employee from '../models/Employee.js'
import asyncHandler from 'express-async-handler'

//getEmployees function to get all employees
export const getEmployees = asyncHandler(async(req, res) => {
    const employees = await Employee.find({})
    res.json(employees)
})

//getEmployeeById function to retrieve employee by id
export const getEmployeeById  = asyncHandler(async(req, res) => {
    const employee = await Employee.findById(req.params.id)

    //if employee id match param id send employee else throw error
    if(employee){
        res.json(employee)
    }else{
        res.status(404).json({message: "employee not found"})
        res.status(404)
        throw new Error('employee not found')
    }
})