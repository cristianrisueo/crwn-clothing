// Redux components
import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";

// Root reducer
import { rootReducer } from "./root/rootReducer";

// Optional, used for testing purposes
const middlewares = [logger];
const composedMiddlewares = compose(applyMiddleware(...middlewares));

// Store creation
export const store = createStore(rootReducer, undefined, composedMiddlewares);
