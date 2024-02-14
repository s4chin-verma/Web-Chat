import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResetPasswordPayload, ChangePasswordPayload } from '@/app/types/payloadTypes';
import { showToast } from '@/lib/validators';
import { backendURL } from '../types';
import axios from 'axios';

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async ({ email }: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`${backendURL}/api/user/reset-password`, { email }, config);
      showToast(data.msg, 'success');
      return data;
    } catch (error: any) {
      showToast(error.response.data.msg);
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/change-password',
  async ({ password, token }: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${backendURL}/api/user/reset-password`,
        { password },
        config
      );
      showToast(data.msg, 'success');
    } catch (error: any) {
      showToast(error.response.data.msg);
      return rejectWithValue(error.message);
    }
  }
);
