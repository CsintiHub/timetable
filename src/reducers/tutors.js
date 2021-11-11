import {
  TUTOR_SAVED,
  TUTOR_UPDATED,
  TUTOR_DELETED,
  SET_TUTORS,
  TUTOR_FETCHED,
} from "../actions/tutors";

const initialState = [];

export const tutorsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const tutors = state;

  if (type === SET_TUTORS) {
    const tutors = payload;
    return tutors;
  }

  if (type === TUTOR_SAVED) {
    const tutor = payload;
    return [...tutors, tutor];
  }

  if (type === TUTOR_UPDATED) {
    const tutor = payload;
    return tutors.map((t) => (t.id === tutor.id ? tutor : t));
  }

  if (type === TUTOR_DELETED) {
    const tutor = payload;
    return tutors.filter((t) => t.id !== tutor.id);
  }

  if (type === TUTOR_FETCHED) {
    const tutor = payload;
    return tutor;
  }

  return state;
};
