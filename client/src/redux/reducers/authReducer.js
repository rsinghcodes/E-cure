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

const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem('token');
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
      });
  },
});

export const { logout } = authReducer.actions;
export default authReducer.reducer;
