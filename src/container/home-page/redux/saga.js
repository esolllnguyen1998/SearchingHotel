import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_ALL_HOTELS, receiveApiGetAllHotels,
    REQUEST_API_GET_ALL_HOTEL_PRICE, receiveApiGetAllHotelPrice,
} from './action';
import {
    requestGetAllHotels, requestGetPriceByCurrency
} from './api';

function* getAllHotelsSaga() {
    try {
        const data = yield call(requestGetAllHotels);
        yield put(receiveApiGetAllHotels(data));
    } catch (e) {
        console.log(e);
    }
}

function* getHotelPrices() {
    try {
        const data = yield call(requestGetPriceByCurrency);
        yield put(receiveApiGetAllHotelPrice(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* homepageSaga() {
    yield takeLatest(REQUEST_API_GET_ALL_HOTELS, getAllHotelsSaga);
    yield takeLatest(REQUEST_API_GET_ALL_HOTEL_PRICE, getHotelPrices);
}