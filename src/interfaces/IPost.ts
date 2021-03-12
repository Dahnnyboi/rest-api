import { Document } from 'mongoose';

interface IPost extends Document {
  title: string,
  description: string,
}

export default IPost;
