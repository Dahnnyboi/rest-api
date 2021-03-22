import { Document } from 'mongoose';

interface IUser extends Document {
  name: string,
  email: string,
  salt: string,
  password: string,
}

export default IUser;
