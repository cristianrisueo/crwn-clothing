// Redux components
import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

// Root reducer
import { rootReducer } from "./root/rootReducer";

/*
  Configuration object of the persist middleware
  Key: What reducer we're gonna check. Root is the main reducer, everything
  Storage: What type of storage we're gonna use. we've chosen localstorage
  Blacklist: What reducers we want to let without check
*/
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

// Creation of the persisted reducer from the config file and the root reducer
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

/* 
  Middlewares are libraries added to Redux to do some additional functions
  Logger is used for testing purposes, to see the value of the reducers
  We're going to use an if statement to make sure that only works for testing
*/
const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);

/*
  We're going to do a check to always have a logger in development mode
  If we're in development mode and there's a window object we're going to use 
  the redux pluggin as middleware which is far better than the logger if not
  the middleware of logger for the console.
*/
const composeChecked =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedMiddlewares = composeChecked(applyMiddleware(...middlewares));

// Store creation
export const store = createStore(
  persistedRootReducer,
  undefined,
  composedMiddlewares
);

// Creation of a persisted store from the store
export const persistedStore = persistStore(store);
