import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '@/utils/setAuthToken';
import type { AppDispatch } from '../app/store';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from '../types';

export const registerPatient =
  (userData, history) => (dispatch: AppDispatch) => {
    axios
      .post('/api/patient/register', userData)
      .then((res) => history.push('/patient/login'))
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

export const loginPatient = (userData) => (dispatch: AppDispatch) => {
  axios
    .post('/api/patient/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const registerDoctor =
  (userData, history) => (dispatch: AppDispatch) => {
    axios
      .post('/api/doctor/register', userData)
      .then((res) => history.push('/doctor/login'))
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

export const loginDoctor = (userData) => (dispatch: AppDispatch) => {
  axios
    .post('/api/doctor/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err: any) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
