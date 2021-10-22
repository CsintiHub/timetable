import {
  STORE_USER,
  REMOVE_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/auth";

const initialState = { loggedIn: false, user: null };

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === STORE_USER) {
    return payload;
  }

  if (type === REMOVE_USER) {
    return {};
  }

  // if (type === REGISTER_SUCCESS) {
  //   return {
  //     ...state,
  //     loggedIn: false,
  //   };
  // }

  // if (type === REGISTER_FAIL) {
  //   return {
  //     ...state,
  //     loggedIn: false,
  //   };
  // }

  // if (type === LOGIN_SUCCESS) {
  //   return {
  //     ...state,
  //     loggedIn: false,
  //     user: payload.user,
  //   };
  // }

  // if (type === LOGIN_FAIL) {
  //   return {
  //     ...state,
  //     loggedIn: false,
  //     user: null,
  //   };
  // }

  // if (type === LOGOUT) {
  //   return {
  //     ...state,
  //     loggedIn: false,
  //     user: null,
  //   };
  // }

  return state;
};
