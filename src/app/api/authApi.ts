import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterUserPayload, LoginUserPayload, ResetPasswordPayload } from '@/lib/types';
import { showToast } from '@/lib/utils';

const backendURL = 'http://localhost:8080';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/user/register`,
        { username, email, password },
        config
      );
      return data;
    } catch (error: any) {
      showToast(error.response.data.msg, 'error');
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginUserPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/user/login`,
        { username, password },
        config
      );
      localStorage.setItem('token', data.token);
      return data;
    } catch (error: any) {
      showToast(error.response.data.msg, 'error');
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

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
