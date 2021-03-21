import { Service, Inject } from 'typedi';
import config from '../config';

@Service()
export default class AuthService {
  constructor(
    @Inject('jwt') private jwt,
    @Inject('logger') private logger,
  ) {}

  // login function
  public async createToken(id) {
    const token = await this.jwt.sign({ id }, config.jwtSecret, { algorithm: config.jwtAlgorithm });
    this.logger.info(`Signed token with id : ${id}`);

    return token;
  }
}
