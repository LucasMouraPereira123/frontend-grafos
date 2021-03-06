import { all } from "redux-saga/effects";
import * as global from "./global";
import * as home from "./home";
import * as details from "./details";
import * as search from "./search";
import * as cart from "./cart";

function* Sagas() {
  yield all([
    global.watcherSaga(), 
    home.watcherSaga(),
    details.watcherSaga(),
    search.watcherSaga(),
    cart.watcherSaga(),
  ]);
}

export default Sagas;
