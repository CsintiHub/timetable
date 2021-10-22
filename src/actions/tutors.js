import axios from "axios";

export const TUTOR_SAVED = "TUTOR_SAVED";
export const TUTOR_UPDATED = "TUTOR_UPDATED";
export const TUTOR_DELETED = "TUTOR_DELETED";
export const SET_TUTORS = "SET_TUTORS";
export const TUTOR_FETCHED = "TUTOR_FETCHED";
export const SET_RATING = "SET_RATING";

export function tutorSaved(tutor) {
  return { type: TUTOR_SAVED, tutor };
}
export function tutorUpdated(tutor) {
  return { type: TUTOR_UPDATED, tutor };
}
export function tutorDeleted(tutorId) {
  return { type: TUTOR_DELETED, tutorId };
}
export function setTutors(tutors) {
  return { type: SET_TUTORS, tutors };
}
export function tutorFetched(tutor) {
  return { type: TUTOR_FETCHED, tutor };
}
export function setRating(rating) {
  return { type: SET_RATING, rating };
}

export function addTutor(tutor) {
  return (dispatch) => {
    let { name, email, subject, address, password } = tutor;
    return axios
      .post("/api/tutors", { name, email, subject, address, password })
      .then((response) => dispatch(tutorSaved(response.data.tutor)))
      .catch((error) => console.log(error));
  };
}
export function updateTutor(tutor) {
  return (dispatch) => {
    let { id, name, email, subject, address, password } = tutor;
    return axios
      .put(`/api/tutors/${id}`, { id, name, email, subject, address, password })
      .then((response) => dispatch(tutorUpdated(response.data.tutor)))
      .catch((error) => console.log(error));
  };
}
export function deleteTutor(tutor) {
  return (dispatch) => {
    return axios
      .delete(`/api/tutors/${tutor.id}`)
      .then((response) => dispatch(tutorDeleted(response.data.tutor)))
      .catch((error) => console.log(error));
  };
}
export function fetchTutors() {
  return (dispatch) => {
    return axios
      .get("/api/tutors")
      .then((response) => dispatch(setTutors(response.data.tutors)))
      .catch((error) => console.log(error));
  };
}
export function fetchTutorsbySubject(subject) {
  return (dispatch) => {
    return axios
      .get(`/api/tutors/${subject}`)
      .then((response) => dispatch(setTutors(response.data.tutors)))
      .catch((error) => console.log(error));
  };
}
export function fetchTutor(id) {
  return (dispatch) => {
    return axios
      .get(`/api/tutors/${id}`)
      .then((response) => dispatch(tutorFetched(response.data.tutor)))
      .catch((error) => console.log(error));
  };
}
export function getTutorRating(tutor) {
  return (dispatch) => {
    return axios
      .get(`/api/tutors/${tutor.id}/rating`)
      .then((response) => dispatch(setRating(response.data.rating)))
      .catch((error) => console.log(error));
  };
}
