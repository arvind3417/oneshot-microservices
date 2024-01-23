import { IBlog } from './task.interface'; // Import your blog interface

export interface IBlogSearchByUserResponse {
  status: number;
  message: string;
  blogs: IBlog[];
}
