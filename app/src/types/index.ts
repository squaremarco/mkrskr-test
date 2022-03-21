export type Base = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  username: string;
} & Base;

export type UserMetadata = {
  username: string;
  sub: string;
};

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
