export type Base = {
  _id: string;
};

export type User = {
  username: string;
} & Base;

export type Comment = {
  content: string;
  user: User;
};

export type Post = {
  content: string;
  title: string;
  user: User;
  comments: Comment[];
} & Base;

export type InfiniteQueryResponse<T> = {
  response: T;
  nextPage: number;
  totalPages: number;
};
