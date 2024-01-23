import { Document, Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  aboutBlog: string;
  imageurl: string;
  likes: number;
  comments: number;
  allComments: any[]; // Update the type accordingly
  ownerId: Types.ObjectId;
  createdAt: Date;
}
