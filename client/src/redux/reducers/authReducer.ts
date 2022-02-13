import { SET_CURRENT_USER, USER_LOADING } from '../types';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
