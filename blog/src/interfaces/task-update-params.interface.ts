export interface IBlogUpdateParams {
  title: string;
  aboutBlog: string;
  imageurl: string;
  likes: number;
  comments: number;
  allComments: any[]; // Update the type accordingly
  ownerId: string;
}
