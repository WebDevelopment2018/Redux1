import {createStore} from 'redux';
import React from "react"
import expect from 'expect';
import ReactDOM from 'react-dom';

//const deepFreeze = require('deep-freeze');

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
}


const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    };
};

const store = createStore(todoApp);
console.log("Initial state");
console.log(store.getState());
console.log("--------------------");


console.log("Dispathing");
store.dispatch(
    {
        type: "ADD_TODO",
        id: 0,
        text: 'Learn Redux'
    }
);
console.log(store.getState());
console.log("--------------------");

console.log("Set visibility filter");
store.dispatch(
    {
        type: "SET_VISIBILITY_FILTER",
        filter: "SHOW_COMPLETED"
    }
);
console.log(store.getState());
console.log("--------------------");
