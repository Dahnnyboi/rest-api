import { Request } from 'express';

interface IPostRequest extends Request{
  body: {
    title: string,
    description: string,
  }
}

export default IPostRequest;
