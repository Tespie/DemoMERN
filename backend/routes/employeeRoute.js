import { getEmployeeById, getEmployees } from "../controllers/employeesController.js";
import express from 'express'
const employeesRouter = express.Router()
// const router = "express.Router()"


// express router method to create route for getting all employees
employeesRouter.route('/').get(getEmployees)

// express router method to create route for getting employee by id
employeesRouter.route('/:id').get(getEmployeeById)

export default employeesRouter