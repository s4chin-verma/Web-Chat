import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from '@/app/actions/authActions';
import { resetPassword, changePassword } from '@/app/actions/passwordActions';
import { AuthState, storedUser } from '@/lib/types/redux';

const initialState: AuthState = {
  loading: false,
  userInfo: storedUser !== null ? JSON.parse(storedUser) : null,
  userToken: localStorage.getItem('token') || null,
  error: null,
  success: storedUser !== null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    resetAuthState: state => {
      state.success = false;
      state.userInfo = null;
      state.userToken = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload.response;
        state.userToken = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string | null;
      })
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload.response;
        state.userToken = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(resetPassword.pending, state => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.error = payload as string;
      })
      .addCase(changePassword.pending, state => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.error = payload as string;
      });
  },
});

export const { setLoading, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
