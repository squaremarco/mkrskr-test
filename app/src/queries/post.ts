import { useInfiniteQuery, useQuery } from 'react-query';

import axiosInstance from '../axiosInstance';
import { InfiniteQueryResponse, Post } from '../types';

export const usePostsInfinite = () =>
  useInfiniteQuery<InfiniteQueryResponse<Post[]>>(
    'posts',
    ({ pageParam = 1 }) =>
      axiosInstance
        .get(`/post?perPage=10&page=${pageParam}`)
        .then(({ data }) => ({
          response: data.data,
          nextPage: pageParam + 1,
          totalPages: data.totalPages
        })),
    {
      keepPreviousData: true,
      getNextPageParam: (previousPage) =>
        previousPage.nextPage <= previousPage.totalPages
          ? previousPage.nextPage
          : undefined
    }
  );

export const usePost = (postId: string) =>
  useQuery<Post>(['post', postId], ({ queryKey }) =>
    axiosInstance.get(`/post/${queryKey[1]}`).then((res) => res.data)
  );
