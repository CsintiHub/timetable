import axios from "axios";

export const STUDENT_SAVED = "STUDENT_SAVED";
export const STUDENT_UPDATED = "STUDENT_UPDATED";
export const STUDENT_DELETED = "STUDENT_DELETED";
export const SET_STUDENTS = "SET_STUDENTS";
export const STUDENT_FETCHED = "STUDENT_FETCHED";

export function studentSaved(student) {
  return { type: STUDENT_SAVED, student };
}
export function studentUpdated(student) {
  return { type: STUDENT_UPDATED, student };
}
export function studentDeleted(studentId) {
  return { type: STUDENT_DELETED, studentId };
}
export function setStudents(students) {
  return { type: SET_STUDENTS, students };
}
export function studentFetched(student) {
  return { type: STUDENT_FETCHED, student };
}

export function addStudent(student) {
  return (dispatch) => {
    let { name, email, address, password } = student;
    return axios
      .post("/api/students", { name, email, address, password })
      .then((response) => dispatch(studentSaved(response.data.student)))
      .catch((error) => console.log(error));
  };
}
export function updateStudent(student) {
  return (dispatch) => {
    let { id, name, email, address, password } = student;
    return axios
      .put(`/api/students/${id}`, { id, name, email, address, password })
      .then((response) => dispatch(studentUpdated(response.data.student)))
      .catch((error) => console.log(error));
  };
}
export function deleteStudent(student) {
  return (dispatch) => {
    return axios
      .delete(`/api/students/${student.id}`)
      .then((response) => dispatch(studentDeleted(response.data.student)))
      .catch((error) => console.log(error));
  };
}
export function fetchStudents() {
  return (dispatch) => {
    return axios
      .get("/api/students")
      .then((response) => dispatch(setStudents(response.data.students)))
      .catch((error) => console.log(error));
  };
}
export function fetchStudent(id) {
  return (dispatch) => {
    return axios
      .get(`/api/students/${id}`)
      .then((response) => dispatch(studentFetched(response.data.student)))
      .catch((error) => console.log(error));
  };
}
