import {createStore} from 'redux';
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {todoApp} from './reducers/index';

import App from './components/App';

const persistedState = {
    todos: [{
        id: 0,
        text: 'Welcome Back!',
        completed: false
    }]
}

const store = createStore(
    todoApp,
    persistedState
)



const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
};
render();
