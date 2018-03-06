import {createStore} from 'redux';
import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/App';
import {todoApp} from "./reducers";
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = createStore(
    todoApp,
    persistedState
);
store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    })
}, 1000));
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    )
};
render();

