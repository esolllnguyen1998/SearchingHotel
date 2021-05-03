import React from 'react';
import AscendaNavBar from '../nav-bar';
import render from '../../__test__/utils/render-wrap-util';

it("Navbar render no crash.", () => {
    const component = render(<AscendaNavBar title='AscendaTest' />)
    const navbarBrand = component.getByTestId("navbar-brand");
    expect(navbarBrand.getAttribute("href")).toEqual("/home-page");
})