/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';

const dbConnection = async () => {
  await mongoose.connect(
    'mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false',
  );
};
export default dbConnection;
