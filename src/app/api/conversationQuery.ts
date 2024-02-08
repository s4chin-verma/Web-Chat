import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';
import type { Conversation } from '@/app/types/queryTypes';
import { backendURL } from '../types';

export const conversationsApi = createApi({
  reducerPath: 'conversationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Conversation'],
  endpoints: builder => ({
    getOrCreateConversation: builder.mutation<Conversation, { user1: string; user2: string }>({
      query: body => ({
        url: 'api/chat/conversations',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetOrCreateConversationMutation } = conversationsApi;
