import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';

const handleApiRequest = async (url, data, rejectWithValue) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const response = await handleApiRequest('/login', { email, password }, rejectWithValue);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    const response = await handleApiRequest('/register', { name, email, password }, rejectWithValue);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    checkToken: (state) => {
      const token = localStorage.getItem('token');
      if (!token) {
        state.token = null;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Something went wrong';
    };

    builder
      // Login
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, handleRejected)

      // Logout
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })

      // Register
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, handleRejected);
  },
});

export const { checkToken } = authSlice.actions;
export default authSlice.reducer;