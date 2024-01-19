import { mongoDbService } from "../mongoDB/dbService.js";
import { user } from "../mongoDB/models/user.js";

const {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  count,
  paginate,
} = mongoDbService(user);

export {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  count,
  paginate,
};