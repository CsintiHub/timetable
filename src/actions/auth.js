// import { authApi } from "../api/AuthApi";

// export const STORE_USER = "STORE_USER";
// export const REMOVE_USER = "REMOVE_USER";
// // export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// // export const REGISTER_FAIL = "REGISTER_FAIL";
// // export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// // export const LOGIN_FAIL = "LOGIN_FAIL";
// // export const LOGOUT = "LOGOUT";

// // Sync
// export const storeUser = (authData) => ({
//   type: STORE_USER,
//   payload: authData,
// });
// export const removeUser = () => ({
//   type: REMOVE_USER,
// });

// // Async
// export const login = (username, password) => async (dispatch) => {
//   const response = await authApi.login(username, password);
//   if (response.code) {
//     throw new Error("Auth failed");
//   }
//   dispatch(storeUser(response));
// };

// export const logout = () => (dispatch) => {
//   authApi.logout();
//   dispatch(removeUser());
// };

// // export const restoreUser = () => async (dispatch) => {
// //   const token = authApi.getToken();
// //   if (token) {
// //     const payload = JSON.parse(atob(token.split(".")[1]));
// //     const userId = payload.sub;
// //     const user = await authApi.getUserById(userId, token);
// //     if (!user.code) {
// //       dispatch(
// //         storeUser({
// //           user,
// //           accessToken: token,
// //         })
// //       );
// //     }
// //   }
// // };

// // export const signup = (user) => async (dispatch) => {};
