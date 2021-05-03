import { all, fork } from "redux-saga/effects";
import homepageSaga from '../container/home-page/redux/saga';

export default function* rootSaga() {
    yield all([
        fork(homepageSaga)
    ]);
}
