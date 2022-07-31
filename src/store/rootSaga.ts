import { all, fork } from "redux-saga/effects";
import deliveryPointsSaga from "./deliveryPoints/sagas";
import requestsSaga from "./requests/sagas";
import mapSaga from "./map/sagas";

export function* rootSaga() : any {
  yield all([
    fork(requestsSaga),
    fork(deliveryPointsSaga),
    fork(mapSaga)]);
}