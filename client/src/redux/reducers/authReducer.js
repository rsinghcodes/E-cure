import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  isAuthenticated: false,
  error: {},
};

export const registerPatient = createAsyncThunk(
  'user/registerPatient',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/patient/register', userData);

      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginPatient = createAsyncThunk(
  'user/registerPatient',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/patient/login', userData);

      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerDoctor = createAsyncThunk(
  'user/registerDoctor',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/doctor/register', userData);

      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginDoctor = createAsyncThunk(
  'user/loginDoctor',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/doctor/login', userData);

      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('jwtToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(loginPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      });

    builder
      .addCase(registerDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(loginDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authReducer.actions;
export const userSelector = (state) => state.auth;

export default authReducer.reducer;
