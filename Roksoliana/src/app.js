import {createStore} from 'redux';
import React from "react";
import expect from 'expect';
let deepFreeze = require('deepfreeze');


const todos = (state =[], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: 0,
                    text: 'Learn Redux',
                    completed:false
                }
            ];
        default:
            return state;
    }
};

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore,action)
    ).toEqual(stateAfter);
};

testAddTodo();
console.log("All tests passed.");
