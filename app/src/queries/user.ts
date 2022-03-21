import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../axiosInstance';
import { fetchUserMe } from '../reducers/user';
import { User } from '../types';
import { queryClient } from '.';

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation<
    Pick<User & { password: string }, 'username' | 'password'>,
    unknown,
    Pick<User & { password: string }, 'username' | 'password'>
  >(
    'user',
    (user) => axiosInstance.post(`/user`, user).then((res) => res.data),
    {
      onSuccess: () => {
        navigate('/');
        queryClient.invalidateQueries('user');
      }
    }
  );
};

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation<
    Pick<User & { password: string }, 'username' | 'password'>,
    unknown,
    Pick<User & { password: string }, 'username' | 'password'>
  >('user', (user) => axiosInstance.post(`/auth/login`, user), {
    onSuccess: () => {
      navigate('/');
      dispatch(fetchUserMe());
    }
  });
};
