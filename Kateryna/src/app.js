import {createStore, combineReducers} from 'redux';
import React, {Component} from "react"
import ReactDOM from 'react-dom';
import Footer from "./components/Footer";
import AddTodo from "./components/AddTodo";
import VisibleTodoList from "./components/VisibleTodoList";

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

const todoApp = combineReducers({
    todos: todos,
    visibilityFilter: visibilityFilter
});



const TodoApp = ({ store }) =>
    (
        <div>
            <AddTodo store={store} />
            <VisibleTodoList store={store}/>
            <Footer store={store}/>
        </div>
    );

const render = () => {
    ReactDOM.render(
        <TodoApp store={createStore(todoApp)}/>,
        document.getElementById('root')
    )
};
render();

/*
import expect from 'expect';
//const deepFreeze = require('deep-freeze');
const todoApp = combineReducers({
    todos: todos,
    visibilityFilter: visibilityFilter
});

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
*/