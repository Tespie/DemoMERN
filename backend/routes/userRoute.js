import { getUsers, getUserById, register, createUser, login } from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getUsers)

// express router method to create route for getting users by id
router.route('/:id').get(getUserById)

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/create').post(createUser)


export default router