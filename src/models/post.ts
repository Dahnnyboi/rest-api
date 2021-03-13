import mongoose, { Schema } from 'mongoose';

import IPost from '../interfaces/IPost';

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema);
