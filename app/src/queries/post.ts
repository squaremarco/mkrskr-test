import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../axiosInstance';
import { Comment, InfiniteQueryResponse, Post } from '../types';
import { queryClient } from '.';

export const usePostsInfinite = () =>
  useInfiniteQuery<InfiniteQueryResponse<Post[]>>(
    'posts',
    ({ pageParam = 1 }) =>
      axiosInstance
        .get(`/post?perPage=25&page=${pageParam}`)
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

export const useCreatePost = () => {
  const navigate = useNavigate();

  return useMutation<
    Pick<Post, 'title' | 'content'>,
    unknown,
    Pick<Post, 'title' | 'content'>
  >(
    'createPost',
    (comment) => axiosInstance.post(`/post`, comment).then((res) => res.data),
    {
      onSuccess: () => {
        navigate('/');
        queryClient.invalidateQueries('posts');
      }
    }
  );
};

export const useDeletePost = () =>
  useMutation(
    'deletePost',
    (id: string) => axiosInstance.delete(`/post/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      }
    }
  );

export const useCreateComment = (id: string) =>
  useMutation<Pick<Comment, 'content'>, unknown, Pick<Comment, 'content'>>(
    'post/createComment',
    (comment) =>
      axiosInstance
        .patch(`/post/${id}/comment`, comment)
        .then((res) => res.data),
    { onSuccess: () => queryClient.invalidateQueries('post') }
  );

export const useDeleteComment = (id: string) =>
  useMutation(
    'post/deleteComment',
    (commentId: string) =>
      axiosInstance
        .delete(`/post/${id}/comment/${commentId}`)
        .then((res) => res.data),
    { onSuccess: () => queryClient.invalidateQueries('post') }
  );
