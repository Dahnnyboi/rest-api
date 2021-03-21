import { Service, Inject } from 'typedi';
import bcrypt from 'bcrypt';

import config from '../config';

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel,
    @Inject('logger') private logger,
  ) {}

  public async createUser(name: String, password: String, email: String) : Promise<void> {
    const salt = await bcrypt.genSalt(config.saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      salt,
      password: hashPassword,
    };

    await this.userModel.create(newUser);
    this.logger.info('New User: ', newUser);
  }

  public async findUserByEmailAndPass(email: String, password: String) {
    const foundUser = await this.userModel.findOne({ email });

    if (!foundUser) {
      this.logger.warn(`Cannot find user with email of ${email}`);
      return false;
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      this.logger.info('Found User: ');
      return foundUser;
    }

    this.logger.warn('Wrong password!');
    return false;
  }

  public async findUserById(id) {
    const foundUser = await this.userModel.findById(id);
    if (!foundUser) {
      this.logger.warn(`Cannot find user with id of ${id}`);
      return false;
    }

    const user = {
      name: foundUser.name,
      email: foundUser.email,
    };

    return user;
  }
}
