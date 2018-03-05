import {createStore} from 'redux';
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle'

import {todoApp} from './reducers/index';
import {loadState, saveState} from "./localStorage";
import App from './components/App';

const persistedState = loadState();

const store = createStore(
    todoApp,
    persistedState
);

store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    })
}, 1000))


const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
};
render();
