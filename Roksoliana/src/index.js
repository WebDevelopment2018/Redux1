import {createStore} from 'redux';
import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/App';
import {todoApp} from "./reducers";

const persistedState = {
    todos: [{
        id: 0,
        text: 'Welcome Back!',
        completed: false
    }]
};
const store = createStore(
    todoApp,
    persistedState
);
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    )
};
render();

