import React from "react";
import TodoList from "./TodoList";
import {connect} from 'react-redux';
import { withRouter } from 'react-router';


const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(t => t.completed);
        case 'active':
            return todos.filter(t => !t.completed);
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
};
const mapStateToProps = (state, { match }) => ({
    todos: getVisibleTodos(state.todos, match.params.filter || 'all'),
});
const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick: (id) => {
        dispatch(toggleTodo(id));
    }
});

const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList));


export default VisibleTodoList;