import axios from "axios";

export const CLASS_SAVED = "CLASS_SAVED";
export const CLASS_UPDATED = "CLASS_UPDATED";
export const CLASS_DELETED = "CLASS_DELETED";
export const SET_CLASSES = "SET_CLASSES";
export const CLASS_FETCHED = "CLASS_FETCHED";

export function classSaved(claas) {
  return { type: CLASS_SAVED, payload: claas };
}
export function classUpdated(claas) {
  return { type: CLASS_UPDATED, payload: claas };
}
export function classDeleted(claasId) {
  return { type: CLASS_DELETED, payload: claasId };
}
export function setClasses(classes) {
  return { type: SET_CLASSES, payload: classes };
}
export function classFetched(claas) {
  return { type: CLASS_FETCHED, payload: claas };
}

export function addClass(claas) {
  return (dispatch) => {
    return axios
      .post("/api/classes", claas)
      .then((response) => dispatch(classSaved(response.data.claas)))
      .catch((error) => console.log(error));
  };
}
export function updateClass(claas) {
  return (dispatch) => {
    return axios
      .put(`/api/classes/${claas.id}`, claas)
      .then((response) => dispatch(classUpdated(response.data.claas)))
      .catch((error) => console.log(error));
  };
}
export function deleteClass(claas) {
  return (dispatch) => {
    return axios
      .delete(`/api/classes/${claas.id}`)
      .then((response) => dispatch(classDeleted(response.data.claas)))
      .catch((error) => console.log(error));
  };
}
export function fetchClass(id) {
  return (dispatch) => {
    return axios
      .get(`/api/classes/${id}`)
      .then((response) => dispatch(classFetched(response.data.claas)))
      .catch((error) => console.log(error));
  };
}

export function fetchClasses() {
  return (dispatch) => {
    return axios
      .get(`/api/users/${JSON.parse(localStorage.user).id}/classes`)
      .then((response) => dispatch(setClasses(response.data.classes)))
      .catch((error) => console.log(error));
  };
}
