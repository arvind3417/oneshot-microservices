import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConfigService } from './config/config.service';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly configService: ConfigService,
  ) {}

  public async searchUser(params: { email: string }): Promise<IUser[]> {
    return this.userModel.find(params).exec();
  }

  public async searchUserById(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  // public async updateUserById(
  //   id: string,
  //   userParams: { is_confirmed: boolean },
  // ): Promise<IUser> {
  //   return this.userModel.updateOne({ _id: id }, userParams).exec();
  // }
  public async updateUserById(
    id: string,
    userParams: { is_confirmed: boolean },
  ):Promise<IUser| null> {
    // Use findOneAndUpdate to get the updated document
    const updatedTask = await this.userModel.findOneAndUpdate(
      { _id: id },
      userParams,
      { new: true } // Return the modified document rather than the original
    );
  
    return updatedTask;
  }

  public async createUser(user: IUser): Promise<IUser> {
    const userModel = new this.userModel(user);
    return await userModel.save();
  }



}
