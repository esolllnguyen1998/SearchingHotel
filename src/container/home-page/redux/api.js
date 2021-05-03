import { API_URL } from '../../../container/constants'

export const requestGetAllHotels = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL, requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const requestGetPriceByCurrency = async () => {
    const currency = sessionStorage.getItem("currency");
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + "/1/" + currency, requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}