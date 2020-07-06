export interface Post {
  id: number;
  title: string;
  description: string;
  claps: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface User {
  id: number;
  login: string;
  password: string;
  role: string;
}

export interface RootState {
  user: null | User;
  users: null | Array<User>;
  post: null | Post;
  posts: null | Array<Post>;
  error: null | Error;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
