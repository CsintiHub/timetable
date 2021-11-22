import {
  RATING_SAVED,
  // RATING_UPDATED,
  // RATING_DELETED,
  SET_RATINGS,
  // RATING_FETCHED,
} from "../actions/ratings";

const initialState = [];

export const ratingsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const ratings = state;

  if (type === SET_RATINGS) {
    const ratings = payload;
    return ratings;
  }

  if (type === RATING_SAVED) {
    const rating = payload;
    return [...ratings, rating];
  }

  // if (type === RATING_UPDATED) {
  //   const rating = payload;
  //   return ratings.map((t) => (t.id === rating.id ? rating : t));
  // }

  // if (type === RATING_DELETED) {
  //   const rating = payload;
  //   return ratings.filter((t) => t.id !== rating.id);
  // }

  // if (type === RATING_FETCHED) {
  //   const rating = payload;
  //   return rating;
  // }

  return state;
};
