import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

type User = {
  _id: string;
  username: string;
  picture: string;
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getAllUsers: builder.query<User[], void>({
      query: () => `api/chat/users`,
    }),
  }),
  // endpoints: builder =.({
  //   getCurrentChat:builder.query<Chat[], void>({
  //     query: ()=>
  //   })
  // })
  
});

export const { useGetAllUsersQuery } = usersApi;
