import mongoose, { Schema } from 'mongoose';

import IUserDocument from '../interfaces/IUserDocument';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  salt: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IUserDocument>('User', UserSchema);
