import mongoose, { Schema } from 'mongoose';

import IPostDocument from '../interfaces/IPostDocument';

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IPostDocument>('Post', PostSchema);
