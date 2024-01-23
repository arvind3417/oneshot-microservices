import { IBlog } from './task.interface'; // Import your blog interface

export interface IBlogUpdateByIdResponse {
  status: number;
  message: string;
  blog: IBlog | null;
  errors: { [key: string]: any } | null;
}
