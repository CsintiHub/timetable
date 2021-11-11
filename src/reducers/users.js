import {
  USER_SAVED,
  // USER_UPDATED,
  USER_DELETED,
  // SET_USERS,
  // USER_FETCHED,
  // USER_LOGGED_IN,
  // RATING_FETCHED,
  // STORE_USER,
} from "../actions/users";

const initialState = {};

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  // const users = state;

  // if (type === SET_USERS) {
  //   const users = payload;
  //   return users;
  // }

  if (type === USER_SAVED) {
    const user = payload;
    return user;
  }

  // if (type === USER_UPDATED) {
  //   const user = payload;
  //   return users.map((u) => (u.id === user.id ? user : u));
  // }

  if (type === USER_DELETED) {
    // const user = payload;
    // return users.filter((u) => u.id !== user.id);
    return {};
  }

  // if (type === USER_FETCHED) {
  //   const user = payload;
  //   return [user];
  // }

  // if (type === RATING_FETCHED) {
  //   const rating = payload;
  //   return rating;
  // }

  // if (type === STORE_USER) {
  //   return payload;
  // }

  // if (type === USER_LOGGED_IN) {
  //   const user = payload;
  //   return user;
  // }

  return state;
};
