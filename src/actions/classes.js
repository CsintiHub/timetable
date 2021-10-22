import axios from "axios";

export const CLASS_SAVED = "CLASS_SAVED";
export const CLASS_UPDATED = "CLASS_UPDATED";
export const CLASS_DELETED = "CLASS_DELETED";
export const SET_CLASSES = "SET_CLASSES";
export const CLASS_FETCHED = "CLASS_FETCHED";

export function claasSaved(claas) {
  return { type: CLASS_SAVED, claas };
}
export function claasUpdated(claas) {
  return { type: CLASS_UPDATED, claas };
}
export function claasDeleted(claasId) {
  return { type: CLASS_DELETED, claasId };
}
export function setClasses(claas) {
  return { type: SET_CLASSES, claas };
}
export function claasFetched(claas) {
  return { type: CLASS_FETCHED, claas };
}

export function addClass(claas) {
  return (dispatch) => {
    let { online, start, duration, end, accepted } = claas;
    return axios
      .post("/api/claas", { online, start, duration, end, accepted })
      .then((response) => dispatch(claasSaved(response.data.claas)))
      .catch((error) => console.log(error));
  };
}
export function updateClass(claas) {
  return (dispatch) => {
    let { id, online, start, duration, end, accepted } = claas;
    return axios
      .put(`/api/claas/${id}`, { id, online, start, duration, end, accepted })
      .then((response) => dispatch(claasUpdated(response.data.claas)))
      .catch((error) => console.log(error));
  };
}
export function deleteClass(claas) {
  return (dispatch) => {
    return axios
      .delete(`/api/claas/${claas.id}`)
      .then((response) => dispatch(claasDeleted(response.data.claas)))
      .catch((error) => console.log(error));
  };
}
export function fetchClasses() {
  return (dispatch) => {
    return axios
      .get("/api/claas")
      .then((response) => dispatch(setClasses(response.data.claas)))
      .catch((error) => console.log(error));
  };
}
export function fetchClass(id) {
  return (dispatch) => {
    return axios
      .get(`/api/claas/${id}`)
      .then((response) => dispatch(claasFetched(response.data.claas)))
      .catch((error) => console.log(error));
  };
}

// TODO set urls
