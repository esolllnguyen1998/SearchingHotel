import React from 'react';
import HomePage from '../home-page';
import render from '../../../__test__/utils/render-wrap-util';
import * as reactRedux from 'react-redux';

describe("Test render homepage", () => {
    let component;

    beforeEach(() => {
        component = render(<HomePage />);
    })

    it("Homepage should render search-box", () => {
        var input = component.getByTestId('input-data-field');
        expect(input.getAttribute("placeholder")).toEqual("Enter hotel name or address");
    })

    it("Homepage should render selected currencies", () => {
        var selectedCurrencies = component.getByTestId('select-currency');
        expect(selectedCurrencies.length).toEqual(4);
    })

    it("Homepage should render selected stars", () => {
        var selectedStars = component.getByTestId('select-star');
        expect(selectedStars.length).toEqual(6);
    })
})
