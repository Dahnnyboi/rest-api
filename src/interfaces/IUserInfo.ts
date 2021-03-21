import { Request } from 'express';

export interface IGetUserInfo extends Request{
  user: {
    _id: string,
    name: string,
    email: string,
  },
}
