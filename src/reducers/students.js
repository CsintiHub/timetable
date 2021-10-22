import {
  STUDENT_SAVED,
  STUDENT_UPDATED,
  STUDENT_DELETED,
  SET_STUDENTS,
  STUDENT_FETCHED,
} from "../actions/students";

export const studentsReducer = (state = [], action) => {
  const { type, payload } = action;
  const students = state;

  if (type === SET_STUDENTS) {
    const students = payload;
    return students;
  }

  if (type === STUDENT_SAVED) {
    const student = payload;
    return [...students, student];
  }

  if (type === STUDENT_UPDATED) {
    const student = payload;
    return students.map((t) => (t.id === student.id ? student : t));
  }

  if (type === STUDENT_DELETED) {
    const student = payload;
    return students.filter((t) => t.id !== student.id);
  }

  if (type === STUDENT_FETCHED) {
    const student = payload;
    return student;
  }

  return state;
};
