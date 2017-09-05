import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
    const div = document.createElement('div');

    let localStorageMock = (function () {
        let store = {};
        return {
            getItem: function (key) {
                return store[key];
            },
            setItem: function (key, value) {
                store[key] = value.toString();
            },
            clear: function () {
                store = {};
            },
            removeItem: function (key) {
                delete store[key];
            }
        };
    })();

    Object.defineProperty(window, 'localStorage', {value: localStorageMock});

    ReactDOM.render(<App />, div);
});
