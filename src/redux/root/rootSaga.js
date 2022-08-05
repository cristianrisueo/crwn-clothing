// Redux-Saga libraries
import { all, call } from "redux-saga/effects";

// Application Sagas
import { productsSaga } from "../products/productsSaga";
import { userSaga } from "../user/userSaga";

// Root Saga
export function* rootSaga() {
  yield all([call(productsSaga), call(userSaga)]);
}
