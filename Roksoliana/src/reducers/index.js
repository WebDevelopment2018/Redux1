import {combineReducers} from 'redux';
import {todos} from "./todos";

export const todoApp = combineReducers({
    todos: todos
});
export default todoApp;