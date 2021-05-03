import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render as renderTest } from '@testing-library/react';
import rootReducer from '../../redux-core/reducers'

export default function render(ui, { initState, store = createStore(rootReducer, initState), ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return renderTest(ui, { wrapper: Wrapper, ...renderOptions })
}