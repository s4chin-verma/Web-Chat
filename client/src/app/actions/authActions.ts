import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterUserPayload, LoginUserPayload } from '@/app/types/payloadTypes';
import { showToast } from '@/lib/validators';

const backendURL = import.meta.env.VITE_SERVER_URL;

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password, picture }: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/user/register`,
        { username, email, password, picture },
        config
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.response));
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
      localStorage.setItem('user', JSON.stringify(data.response));
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
