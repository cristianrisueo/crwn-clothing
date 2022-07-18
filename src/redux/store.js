// Redux libraries
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// Root reducer
import { rootReducer } from "./root/rootReducer";

// For deployment purposes, to use the logging dev tools
const middlewares = [logger];
const composedMiddlewares = compose(applyMiddleware(...middlewares));

// Store receives the reducer, previous state to pass, middlewares like logger
export const store = createStore(rootReducer, undefined, composedMiddlewares);
