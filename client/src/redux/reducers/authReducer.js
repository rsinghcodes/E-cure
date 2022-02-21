import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  loading: false,
  error: '',
};

export const registerPatient = createAsyncThunk(
  'user/registerPatient',
  async (userData, navigate) => {
    const response = await axios.post(
      'http://localhost:4000/api/patient/register',
      userData
    );
    navigate('/login', { replace: true });
    return response.data;
  }
);

export const loginPatient = createAsyncThunk(
  'user/registerPatient',
  async (userData, navigate) => {
    const response = await axios.post(
      'http://localhost:4000/api/patient/login',
      userData
    );
    navigate('/dashboard', { replace: true });
    return response.data;
  }
);

export const registerDoctor = createAsyncThunk(
  'user/registerDoctor',
  async (userData, navigate) => {
    const response = await axios.post(
      'http://localhost:4000/api/doctor/register',
      userData
    );
    navigate('/doctor/login', { replace: true });
    return response.data;
  }
);

export const loginDoctor = createAsyncThunk(
  'user/loginDoctor',
  async (userData, navigate) => {
    const response = await axios.post(
      'http://localhost:4000/api/doctor/login',
      userData
    );
    navigate('/dashboard', { replace: true });
    return response.data;
  }
);

const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem('jwtToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('jwtToken', action.payload);
      });

    builder
      .addCase(loginPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('jwtToken', action.payload);
      });

    builder
      .addCase(registerDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('jwtToken', action.payload);
      });

    builder
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('jwtToken', action.payload);
      });
  },
});

export const { logout } = authReducer.actions;
export default authReducer.reducer;
