import React from 'react';
import HomePage from '../home-page';
import render from '../../../__test__/utils/render-wrap-util';

it("Homepage render no crash.", () => {
    const component = render(<HomePage />)
})