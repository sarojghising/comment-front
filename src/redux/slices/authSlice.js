import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';



// Async thunk for user login
export const loginUser = createAsyncThunk(
    '/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


export const registerUser = createAsyncThunk(
  '/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  });

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
     checkToken:  (state) => {
        const token = localStorage.getItem('token');
        if (!token) {
            state.token = null;
            state.user = null;
        }
     }
  },
  extraReducers: (builder) => {
    // login 
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

    // logout
    builder
     .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })

    // register 
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});

export const { checkToken } = authSlice.actions;
export default authSlice.reducer;