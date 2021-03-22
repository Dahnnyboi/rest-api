import { Request } from 'express';

interface IUserRequest extends Request{
  user: {
    _id: string,
    name: string,
    email: string,
  },
}

export default IUserRequest;
