import { Service, Inject } from 'typedi';

import IPost from '../interfaces/IPost';

@Service()
export default class PostService {
  constructor(
    @Inject('postModel') private postModel,
    @Inject('logger') private logger,
  ) {}

  public async createPost(post: IPost): Promise<void> {
    await this.postModel.create(post);
    this.logger.info('New Post: ', post);
  }

  public async getPostById(id: string): Promise<IPost> {
    const post = await this.postModel.findById(id);
    this.logger.info(`Post id: ${id} `, post);

    return post;
  }

  public async getPosts(limit?, offset?) {
    let pageOffset = 0;
    let postLimit = 10;
    if (offset) {
      pageOffset = parseInt(offset, 10);
    }
    if (limit) {
      postLimit = parseInt(offset, 10);
    }

    const result = await Promise.all([
      this.postModel.find()
        .limit(postLimit)
        .skip(pageOffset * postLimit)
        .sort({ createdAt: 'desc' })
        .exec(),
      this.postModel.estimatedDocumentCount(),
    ]);

    this.logger.info('Posts: ', result[0]);
    this.logger.info('Posts Count: ', result[1]);

    return { posts: result[0], postsCount: result[1] };
  }

  public async updatePostById(id: string, post: IPost): Promise<void> {
    await this.postModel.findOneAndUpdate(id, post);
    this.logger.info('Updated Post: ', post);
  }

  public async deletePostById(id: string): Promise<void> {
    await this.postModel.findOneAndDelete(id);
    this.logger.info(`Deleted Post id: ${id}`);
  }
}
