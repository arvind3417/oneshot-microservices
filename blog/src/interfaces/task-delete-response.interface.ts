export interface IBlogDeleteResponse {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}
