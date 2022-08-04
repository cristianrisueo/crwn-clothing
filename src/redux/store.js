// Redux components
import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk"; We don't need it if we use Sagas
import createSagaMiddleware from "redux-saga";

// Root reducer and root Saga
import { rootReducer } from "./root/rootReducer";
import { rootSaga } from "./root/rootSaga";

/*
  Configuration object of the persist middleware
  Key: What reducer we're gonna check. Root is the main reducer, everything
  Storage: What type of storage we're gonna use. we've chosen localstorage
  Blacklist: What reducers we want to let without persist in storage
  Whitelist: What reducers we want to persist in storage
*/
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"],
};

// Creation of the persisted reducer from the config file and the root reducer
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

// Creation of the Redux-Saga middleware
const sagaMiddleware = createSagaMiddleware();

/* 
  Middlewares are libraries added to Redux to do some additional functions
  Logger is used for testing purposes, to see the value of the reducers
  We're going to use an if statement to make sure that only works for testing
*/
const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  // thunk,
  sagaMiddleware,
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

// After the createStore instance we run the root Saga
sagaMiddleware.run(rootSaga);

// Creation of a persisted store from the store
export const persistedStore = persistStore(store);
