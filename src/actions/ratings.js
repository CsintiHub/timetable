import axios from "axios";

//TODO
export const RATING_SAVED = "RATING_SAVED";
// export const RATING_UPDATED = "RATING_UPDATED";
// export const RATING_DELETED = "RATING_DELETED";
export const SET_RATINGS = "SET_RATINGS";
// export const RATING_FETCHED = "RATING_FETCHED";

export function ratingSaved(rating) {
  return { type: RATING_SAVED, payload: rating };
}
// export function ratingUpdated(rating) {
//   return { type: RATING_UPDATED, payload: rating };
// }
// export function ratingDeleted(ratingId) {
//   return { type: RATING_DELETED, payload: ratingId };
// }
export function setRatings(ratings) {
  return { type: SET_RATINGS, payload: ratings };
}
// export function ratingFetched(rating) {
//   return { type: RATING_FETCHED, payload: rating };
// }

export function addRating(rating, id) {
  return (dispatch) => {
    return axios
      .post(`/api/users/${id}/rating`, rating)
      .then((response) => dispatch(ratingSaved(response.data.rating)))
      .catch((error) => console.log(error));
  };
}
// export function updateRating(rating) {
//   return (dispatch) => {
//     return axios
//       .put(`/api/ratings/${rating.id}`, rating)
//       .then((response) => dispatch(ratingUpdated(response.data.rating)))
//       .catch((error) => console.log(error));
//   };
// }
// export function deleteRating(rating) {
//   return (dispatch) => {
//     return axios
//       .delete(`/api/ratings/${rating.id}`)
//       .then((response) => dispatch(ratingDeleted(response.data.rating)))
//       .catch((error) => console.log(error));
//   };
// }
// export function fetchRating(id) {
//   return (dispatch) => {
//     return axios
//       .get(`/api/ratings/${id}`)
//       .then((response) => dispatch(ratingFetched(response.data.rating)))
//       .catch((error) => console.log(error));
//   };
// }
export function fetchRatings(id) {
  return (dispatch) => {
    return axios
      .get(`/api/users/${id}/ratings`)
      .then((response) => dispatch(setRatings(response.data.ratings)))
      .catch((error) => console.log(error));
  };
}
