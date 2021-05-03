export const API_URL = "https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo";
export const CURRENCIES = ["USD", "SGD", "CNY", "KRW"];
export const STARS = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];


Number.prototype.caculatePercentage = function (greaterPrice) {
    return Math.round(((greaterPrice - this.valueOf()) / this.valueOf()) * 100);
}

Number.prototype.caculatePercentageTaxAndFee = function (totalPrice) {
    return Math.round((this.valueOf() / totalPrice) * 100);
}