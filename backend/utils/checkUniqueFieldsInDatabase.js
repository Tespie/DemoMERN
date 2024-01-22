/**
 * checkUniqueFieldsInDatabase: check unique fields in database for insert or update operation.
 * @param {Array} fieldsToCheck : array of fields to check in database.
 * @param {Object} data : data to insert or update.
 * @param {String} operation : operation identification.
 * @param {Object} filter : filter for query.
 * @return {Object} : information about duplicate fields.
 */
// const checkUniqueFieldsInDatabase = (db) => async (fieldsToCheck, data, operation, filter = {}) => {
export const checkUniqueFieldsInDatabase = (db) => async (fieldsToCheck, data, operation, filter = {}) => {

  console.log('checkUniqueFieldsInDatabase Called')
  console.log('checkUniqueFieldsInDatabase db = ', db)
  console.log('checkUniqueFieldsInDatabase fieldsToCheck = ', fieldsToCheck)
  console.log('checkUniqueFieldsInDatabase data = ', data)
  console.log('checkUniqueFieldsInDatabase operation = ', operation)

  switch (operation) {
    case 'INSERT':
      for (const field of fieldsToCheck) {
        // Add unique field and it's value in filter.
        const query = {
          ...filter,
          [field]: data[field],
        };
        const found = await db.findOne(query);
        if (found) {
          return {
            isDuplicate: true,
            field,
            value: data[field],
          };
        }
      }
      break;
    case 'BULK_INSERT':
      for (const dataToCheck of data) {
        for (const field of fieldsToCheck) {
          // Add unique field and it's value in filter.
          const query = {
            ...filter,
            [field]: dataToCheck[field],
          };
          const found = await db.findOne(query);
          if (found) {
            return {
              isDuplicate: true,
              field,
              value: dataToCheck[field],
            };
          }
        }
      }
      break;
    case 'UPDATE':
    case 'BULK_UPDATE':
      const existData = await db.findMany(filter, { select: ['_id'] });
      for (const field of fieldsToCheck) {
        if (Object.keys(data).includes(field)) {
          if (existData && existData.length > 1) {
            return {
              isDuplicate: true,
              field,
              value: data[field],
            };
          } if (existData && existData.length === 1) {
            const found = await db.findOne({ [field]: data[field] });
            if (found && (existData[0]._id.toJSON() !== found._id.toJSON())) {
              return {
                isDuplicate: true,
                field,
                value: data[field],
              };
            }
          }
        }
      }
      break;
    default:
      return { isDuplicate: false };
      break;
  }
  return { isDuplicate: false };
};

// module.exports = checkUniqueFieldsInDatabase;
