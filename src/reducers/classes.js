import {
  CLASS_SAVED,
  CLASS_UPDATED,
  CLASS_DELETED,
  SET_CLASSES,
  CLASS_FETCHED,
} from "../actions/classes";

export const classesReducer = (state = [], action) => {
  const { type, payload } = action;
  const classes = state;

  if (type === SET_CLASSES) {
    const classes = payload;
    return classes;
  }

  if (type === CLASS_SAVED) {
    const claas = payload;
    return [...classes, claas];
  }

  if (type === CLASS_UPDATED) {
    const claas = payload;
    return classes.map((t) => (t.id === claas.id ? claas : t));
  }

  if (type === CLASS_DELETED) {
    const claas = payload;
    return classes.filter((t) => t.id !== claas.id);
  }

  if (type === CLASS_FETCHED) {
    const claas = payload;
    return claas;
  }

  return state;
};
