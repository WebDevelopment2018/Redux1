import {combineReducers} from 'redux';
import todos, * as fromTodos from './todos';

export const todoApp = combineReducers({
    todos: todos
});

export const getVisibleTodos = (state, filter) =>
    fromTodos.getVisibleTodos(state.todos, filter);