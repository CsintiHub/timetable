import { applyMiddleware, combineReducers, createStore, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { classesReducer } from "./classes";

const rootReducer = combineReducers({
  // students: studentsReducer,
  // users: usersReducer,
  // tutors: tutorsReducer,
  // auth: authReducer,
  classes: classesReducer,
});

const logger = createLogger({
  collapsed: true,
});

export const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
};
