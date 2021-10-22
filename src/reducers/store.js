import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
// import { authReducer } from "./auth/reducer";
import { classesReducer } from "./classes";
// import { studentsReducer } from "./students";
// import { tutorsReducer } from "./tutors";
import { usersReducer } from "./users";

const rootReducer = combineReducers({
  // students: studentsReducer,
  users: usersReducer,
  // tutors: tutorsReducer,
  classes: classesReducer,
  // auth: authReducer,
});

const logger = createLogger({
  collapsed: true,
});

export const configureStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
};
