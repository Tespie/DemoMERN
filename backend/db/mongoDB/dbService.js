// const mongoDbService = (Model) => {
export const mongoDbService = (Model) => {
  const create = (data) => new Promise(async (resolve, reject) => {
    // Model.create(data, (error, result) => {
    //   if (error) reject(error);
    //   else resolve(result);
    // });
    try {
      const result = await Model.create(data);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

  const updateOne = (filter, data, options = { new: true }) => new Promise((resolve, reject) => {
    Model.findOneAndUpdate(filter, data, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  const deleteOne = (filter, options = { new: true }) => new Promise((resolve, reject) => {
    Model.findOneAndDelete(filter, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  const updateMany = (filter, data) => new Promise((resolve, reject) => {
    Model.updateMany(filter, data, (error, result) => {
      if (error) reject(error);
      else resolve(result.modifiedCount);
    });
  });

  const deleteMany = (filter, data) => new Promise((resolve, reject) => {
    Model.deleteMany(filter, data, (error, result) => {
      if (error) reject(error);
      else resolve(result.deletedCount);
    });
  });

  const findOne = (filter) => new Promise((resolve, reject) => {
    Model.findOne(filter, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  const findMany = (filter) => new Promise((resolve, reject) => {
    Model.find(filter, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  const count = (filter) => new Promise((resolve, reject) => {
    Model.countDocuments(filter, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  const paginate = (filter, options) => new Promise((resolve, reject) => {
    Model.paginate(filter, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  return {
    create,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,
    findOne,
    findMany,
    count,
    paginate,
  }

  // return Object.freeze({
  //   create,
  //   updateOne,
  //   updateMany,
  //   deleteOne,
  //   deleteMany,
  //   findOne,
  //   findMany,
  //   count,
  //   paginate,
  // });
};

// export default mongoDbService;