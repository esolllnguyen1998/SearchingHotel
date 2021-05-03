export const REQUEST_API_GET_ALL_HOTELS = "REQUEST_API_GET_ALL_HOTELS";
export const RECEIVE_API_GET_ALL_HOTELS = "RECEIVE_API_GET_ALL_HOTELS";

export const requestApiGetAllHotels = () => ({ type: REQUEST_API_GET_ALL_HOTELS });
export const receiveApiGetAllHotels = hotels => ({ type: RECEIVE_API_GET_ALL_HOTELS, hotels });

export const REQUEST_API_GET_ALL_HOTEL_PRICE = "REQUEST_API_GET_ALL_HOTEL_PRICE";
export const RECEIVE_API_GET_ALL_HOTELS_PRICE = "RECEIVE_API_GET_ALL_HOTELS_PRICE";

export const requestApiGetAllHotelPrice = () => ({ type: REQUEST_API_GET_ALL_HOTEL_PRICE });
export const receiveApiGetAllHotelPrice = hotelPrice => ({ type: RECEIVE_API_GET_ALL_HOTELS_PRICE, hotelPrice });
