import React from 'react';
import App from '../App';
import render from './utils/render-wrap-util';

test('App will render navbar.', () => {
    const component = render(<App />)
    expect(component.getByText(/Ascenda/)).toBeTruthy()
});