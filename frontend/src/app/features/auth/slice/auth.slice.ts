import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState, User } from '../types';

const API_URL = 'http://localhost:8000/api';

export const fetchCsrfToken = createAsyncThunk(
  'auth/fetchCsrfToken',
  async () => {
    const response = await fetch(`${API_URL}/csrf/`, {
      credentials: 'include',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      },
    });
    const data = await response.json();
    Cookies.set('csrftoken', data.csrfToken);
    return data.csrfToken;
  }
);

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/auth/user/`, {
      credentials: 'include',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Failed to fetch user');
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
});

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  csrfToken: Cookies.get('csrftoken') || '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove('csrftoken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.csrfToken = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
