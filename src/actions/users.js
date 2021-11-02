import axios from "axios";
// import { response } from "express";

export const USER_SAVED = "USER_SAVED";
export const USER_UPDATED = "USER_UPDATED";
export const USER_DELETED = "USER_DELETED";
export const SET_USERS = "SET_USERS";
export const USER_FETCHED = "USER_FETCHED";
export const USER_RATED = "USER_RATED";
export const RATING_FETCHED = "RATING_FETCHED";

export function userSaved(user) {
  return { type: USER_SAVED, user };
}
export function userUpdated(user) {
  return { type: USER_UPDATED, user };
}
export function userDeleted(userId) {
  return { type: USER_DELETED, userId };
}
export function setUsers(users) {
  return { type: SET_USERS, users };
}
export function userFetched(user) {
  return { type: USER_FETCHED, user };
}
// export function userLoggedIn(user) {
//   return { type: USER_LOGGED_IN, user };
// }
export function ratingFetched(rating) {
  return { type: RATING_FETCHED, rating };
}

export function userRated(rating) {
  return { type: USER_RATED, rating };
}

export function addUser(user) {
  return (dispatch) => {
    let { name, email, subject, address, password } = user;
    return axios
      .post("/api/signup", { name, email, subject, address, password })
      .then((response) => {
        dispatch(userSaved(response.data.user));
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
}
export function updateUser(user) {
  return (dispatch) => {
    let { id, name, email, subject, address, password } = user;
    return axios
      .put(`/api/users/${id}`, { id, name, email, subject, address, password })
      .then((response) => dispatch(userUpdated(response.data.user)))
      .catch((error) => console.log(error));
  };
}
export function deleteUser(user) {
  return (dispatch) => {
    return axios
      .delete(`/api/users/${user.id}`)
      .then((response) => dispatch(userDeleted(response.data.user)))
      .catch((error) => console.log(error));
  };
}
export function fetchUsers() {
  return (dispatch) => {
    return axios
      .get("/api/users")
      .then((response) => dispatch(setUsers(response.data.users)))
      .catch((error) => console.log(error));
  };
}
// export function fetchUsers(subject) {
//   return (dispatch) => {
//     return axios
//       .get(`/api/users/${subject}`)
//       .then((response) => dispatch(setUsers(response.data.users)))
//       .catch((error) => console.log(error));
//   };
// }
export function fetchUser(id) {
  return (dispatch) => {
    return axios
      .get(`/api/users/${id}`)
      .then((response) => dispatch(userFetched(response.data.user)))
      .catch((error) => console.log(error));
  };
}

// TODO figure out wtf is going on
export function loginUser(email, password) {
  return (dispatch) => {
    return axios
      .post("/api/login", { email, password })
      .then((response) => {
        if (response.data.token !== null && response.data.user !== null) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch(userFetched(response.data.user));
        }
        // return response.data;
      })
      .catch((error) => console.log(error));
  };
}

//TODO dispatch?
export function logoutUser() {
  localStorage.removeItem("user");
  return (dispatch) => {
    return axios
      .get("/api/logout") //.then(response =>)
      .catch((error) => console.log(error));
  };
}

export function signupUser(user) {
  return (dispatch) => {
    return axios
      .post("api/signup", { user })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch(userFetched(response.data.user));
        }
        return response.data;
      })
      .catch((error) => console.log(error));
  };
}

export function getRating(user) {
  return (dispatch) => {
    return axios
      .get(`user/${user.id}/rating`)
      .then((response) => {
        dispatch(ratingFetched(response.data.rating));
      })
      .catch((error) => console.log(error));
  };
}

export function rateUser(user) {
  return (dispatch) => {
    return axios
      .post(`user/${user.id}/rating`)
      .then((response) => {
        dispatch(userRated(response.data.rating));
      })
      .catch((error) => console.log(error));
  };
}