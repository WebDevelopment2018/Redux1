import {createStore} from 'redux';
import React from "react";
import expect from 'expect';
let deepFreeze = require('deepfreeze');


const toggleTodo = (todo) => {
    return Object.assign({}, todo, {
        //...todo
        completed: !todo.completed
    });
};

const testToggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };
    const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    };

    deepFreeze(todoBefore);

    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
