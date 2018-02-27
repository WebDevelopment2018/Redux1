import {createStore} from 'redux';
import React from "react"
import ReactDOM from 'react-dom';


const addCounter = (list) => [...list, 0];
// return list.concat([0]); // old way

const removeCounter = (list, index) => [
    ...list.slice(0, index),
    ...list.slice(index + 1)
];
// Old way:
//return list
//  .slice(0, index)
//  .concat(list.slice(index + 1));

const incrementCounter = (list, index) => [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
];

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};


const store = createStore(counter);

const Counter = ({
                     value,
                     onIncrement,
                     onDecrement
                 }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() =>
                store.dispatch({
                    type: 'INCREMENT'
                })
            }
            onDecrement={() =>
                store.dispatch({
                    type: 'DECREMENT'
                })
            }
        />,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();
