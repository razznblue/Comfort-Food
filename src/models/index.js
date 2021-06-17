import mongoose from 'mongoose';
 
import User from './user';
import Menu from './menu';
import Food from './food';
 
export const connectDb = () => {
  return mongoose.connect(process.env.URI);
};
 
export const models = { User, Menu, Food };
 
// export { connectDb };
// export default models;