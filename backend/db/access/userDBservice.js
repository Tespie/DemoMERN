import { mongoDbService } from "../mongoDB/dbService.js";
import { user } from "../mongoDB/models/user.js";

// Access the exported functions using the dot operator
const userService = {
  create: mongoDbService(User),
  updateOne: dbService.updateOne(User),
  updateMany: dbService.updateMany(User),
  deleteOne: dbService.deleteOne(User),
  deleteMany: dbService.deleteMany(User),
  findOne: dbService.findOne(User),
  findMany: dbService.findMany(User),
  count: dbService.count(User),
  paginate: dbService.paginate(User),
};