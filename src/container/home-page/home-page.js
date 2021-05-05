import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    InputGroup,
    Input,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import '../../asset/container/home-page.scss';
import { requestApiGetAllHotels, requestApiGetAllHotelPrice } from './redux/action';
import { CURRENCIES, STARS } from '../constants';
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from '@varld/popover';

const HomePage = () => {
    const [hotelDetailed, setHotelDetailed] = useState([]);
    const [hotelDetailedClone, setHotelDetailedClone] = useState([]);
    const [filterItem, setFilterItem] = useState({ star: 0, searchKey: "" });
    const { hotels, hotelPrice } = useSelector(state => state.allHotelsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestApiGetAllHotels());
        if (!sessionStorage.getItem("currency")) {
            sessionStorage.setItem("currency", "USD");
        }
        dispatch(requestApiGetAllHotelPrice());
    }, [])

    useEffect(() => {
        dispatch(requestApiGetAllHotels());
    }, [hotelDetailed])

    useEffect(() => {
        if (Array.isArray(hotels) && Array.isArray(hotelPrice)) {
            let hotelDetailed = []
            hotels.forEach(element => {
                var hotelItemPrice = hotelPrice.find(x => x.id == element.id);
                if (!isNullOrUndefined(hotelItemPrice)) {
                    hotelDetailed.push({
                        ...element,
                        searchTerm: element.name + element.address,
                        price: hotelItemPrice.price,
                        competitors: hotelItemPrice.competitors,
                        taxes_and_fees: hotelItemPrice.taxes_and_fees
                    })
                }
            });
            setHotelDetailed(hotelDetailed);
            setHotelDetailedClone(filterResult(hotelDetailed, filterItem.searchKey, filterItem.star));
        }
    }, [hotelPrice])

    const renderStars = (stars) => {
        var elements = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= stars) {
                elements.push(<span className="fa fa-star star-icon checked"></span>)
            }
            else {
                elements.push(<span className="fa fa-star star-icon"></span>)
            }
        }
        return elements;
    }

    const filterResult = (hotelDetail, text, star) => {
        var hotelClone = [...hotelDetail];
        if (text != "") {
            text = text.toLowerCase();
            hotelClone = hotelClone.filter(x => x.searchTerm.toLowerCase().includes(text));
        }

        if (star != 0) {
            hotelClone = hotelClone.filter(x => x.stars == star);
        }
        return hotelClone;
    }

    const isNullOrUndefined = (value) => {
        return typeof value === 'undefined' || value == null
    }

    const onSelectCurrency = (currency) => {
        sessionStorage.setItem("currency", currency);
        dispatch(requestApiGetAllHotelPrice());
    }

    const onSelectStar = (star) => {
        setFilterItem({ star: star, searchKey: filterItem.searchKey })
        setHotelDetailedClone(filterResult(hotelDetailed, filterItem.searchKey, star));
    }

    const onSearch = (text) => {
        setFilterItem({ star: filterItem.star, searchKey: text })
        setHotelDetailedClone(filterResult(hotelDetailed, text, filterItem.star));
    }

    const renderPopover = (price, competitors) => {
        if (isNullOrUndefined(competitors)) return;
        var competitorElements = [];
        var keys = Object.keys(competitors);
        keys.forEach(e => {
            if (price >= competitors[e]) return;
            var percentage = price.caculatePercentage(competitors[e]);
            competitorElements.push(
                <p><strong className="text-danger">{percentage}%</strong>  more than <strong>{e}</strong></p>
            )
        });

        return <Popover popover={({ visible, open, close }) => {
            return (
                <div >
                    <h4><strong className="text-success">You can save</strong></h4>
                    {competitorElements}
                </div>
            )
        }}>
            <FontAwesomeIcon className="icon-saving-money" icon={faMoneyCheckAlt} />
        </Popover>
    }

    const renderPriceAndTax = (taxes_and_fees, currentCurrency, price) => {
        var formatedPrice = (Math.round(price / 100) * 100).toLocaleString();
        if (isNullOrUndefined(taxes_and_fees)) {
            return <> { formatedPrice} { currentCurrency} </>
        }
        var total = taxes_and_fees.hotel_fees + taxes_and_fees.tax + price;
        var percentageTax = <strong className="text-danger">{taxes_and_fees.tax.caculatePercentageTaxAndFee(total)}%</strong>;
        var percentageHotelFee = <strong className="text-danger">{taxes_and_fees.hotel_fees.caculatePercentageTaxAndFee(total)}%</strong>;
        return (<div className="tooltip" > { formatedPrice} { currentCurrency} <strong className="text-danger">*</strong>
            <span className="tooltiptext">
                Price includes {percentageTax} taxes and {percentageHotelFee} service fees.
            </span>
        </div >)
    }

    const renderHotelList = () => {
        var currentCurrency = sessionStorage.getItem("currency");
        if (Array.isArray(hotelDetailedClone)) {
            return hotelDetailedClone.map((item) => {
                let cssProperties = {
                    '--background-color': item.rating >= 7 ? '#03ae03' : '#e52402',
                    '--content': `'${item.rating}'`
                }

                return <div className="position-relative">
                    <div className="p-2 rating" style={cssProperties}>
                        <Card className="card-custom">
                            <CardImg top className="image-card" src={item.photo} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{item.name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    {renderStars(item.stars)}
                                </CardSubtitle>
                                <CardTitle tag="h5">
                                    <div className="row">
                                        <div className="col-10">
                                            {renderPriceAndTax(item.taxes_and_fees, currentCurrency, item.price)}
                                        </div>
                                        <div className="col-2 text-right">
                                            {renderPopover(item.price, item.competitors)}
                                        </div>
                                    </div>
                                </CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{item.address}</CardSubtitle>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            })
        }
    }

    return (
        <div className="home-page-container">
            <div className="banner-advertisement"></div>
            <div className="search-box">
                <div className="search-form">
                    <div className="row">
                        <div className="col-lg-8 col-md-7 col-sm-5" >
                            <InputGroup className="input-group-custom">
                                <Input data-testid='input-data-field' onChange={(e) => onSearch(e.target.value)} placeholder="Enter hotel name or address" />
                            </InputGroup>
                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-3 text-right">
                            <select data-testid='select-star' onChange={(e) => onSelectStar(e.target.value)} className="custom-select select-input input-group-custom">
                                <option selected value="0">Select Star</option>
                                {STARS.map((x, i) => {
                                    let index = i + 1;
                                    return <option value={index}>{x}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-2 text-right">
                            <select data-testid='select-currency' onChange={(e) => onSelectCurrency(e.target.value)} className="custom-select select-input input-group-custom">
                                {CURRENCIES.map(x => {
                                    if (x == sessionStorage.getItem("currency")) {
                                        return <option selected value={x}>{x}</option>
                                    }
                                    return <option value={x}>{x}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center scrolling-down" >
                        {renderHotelList()}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default HomePage;
