import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../axiosInstance';
import { UserMetadata } from '../types';

type UserState = Partial<UserMetadata>;

const initialState: UserState = {};

export const login = createAsyncThunk(
  'user/login',
  async (payload: { username: string; password: string }) => {
    await axiosInstance.post('/auth/login', payload);
    return await axiosInstance
      .get<UserMetadata>('/user/me')
      .then((res) => res.data);
  }
);

export const logout = createAsyncThunk('user/logout', () =>
  axiosInstance.post<UserMetadata>('/auth/logout').then(() => ({}))
);

export const fetchUserMe = createAsyncThunk('user/fetchUserMe', () =>
  axiosInstance.get<UserMetadata>('/user/me').then((res) => res.data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserMe.fulfilled, (_, action) => action.payload);
    builder.addCase(login.fulfilled, (_, action) => action.payload);
    builder.addCase(logout.fulfilled, (_, action) => action.payload);
  }
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
