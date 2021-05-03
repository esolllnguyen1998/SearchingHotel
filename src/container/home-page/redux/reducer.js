import {
    RECEIVE_API_GET_ALL_HOTELS, RECEIVE_API_GET_ALL_HOTELS_PRICE
} from './action';

const initialState = {}

export const allHotelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_API_GET_ALL_HOTELS:
            return { ...state, hotels: action.hotels };
        case RECEIVE_API_GET_ALL_HOTELS_PRICE:
            return { ...state, hotelPrice: action.hotelPrice };
        default:
            return state;
    }
}
