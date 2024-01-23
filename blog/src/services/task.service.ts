import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IBlog } from '../interfaces/task.interface'; // Import your blog interface
import { IBlogUpdateParams } from '../interfaces/task-update-params.interface'; // Import your blog update params interface

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<IBlog>) {}

  public async getBlogsByOwnerId(ownerId: string): Promise<IBlog[]> {
    return this.blogModel.find({ ownerId }).exec();
  }

  public async createBlog(blogBody: IBlog): Promise<IBlog> {
    const blogModel = new this.blogModel(blogBody);
    return await blogModel.save();
  }

  public async findBlogById(id: string) {
    return await this.blogModel.findById(id);
  }

  public async removeBlogById(id: string) {
    return await this.blogModel.findOneAndDelete({ _id: id });
  }

  public async updateBlogById(
    id: string,
    params: IBlogUpdateParams,
  ): Promise<IBlog | null> {
    // Use findOneAndUpdate to get the updated document
    const updatedBlog = await this.blogModel.findOneAndUpdate(
      { _id: id },
      params,
      { new: true } // Return the modified document rather than the original
    );

    return updatedBlog;
  }
}
