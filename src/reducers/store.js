import { applyMiddleware, combineReducers, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { classesReducer } from "./classes";
import { ratingsReducer } from "./ratings";

const rootReducer = combineReducers({
  classes: classesReducer,
  ratings: ratingsReducer,
});

const logger = createLogger({
  collapsed: true,
});

export const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
};
