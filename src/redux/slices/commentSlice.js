import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from '../../config/apiConfig';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments`, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/comments`,{ title, content },getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/comments/${id}`,getAuthHeader());
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ id, title, content }, { rejectWithValue }) => {
    try {
      const response = await axios.put( `${API_BASE_URL}/comments/${id}`,{ title, content },getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });


const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // create a new comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload.data);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // delete a comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // update a comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        state.comments = state.comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        );
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
     
  },
});

export default commentSlice.reducer;