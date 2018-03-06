import React from "react";
import TodoList from "./TodoList";
import {connect} from 'react-redux';


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
const mapStateToProps = (state, ownProps) => ({
    todos: getVisibleTodos(
        state.todos,
        ownProps.filter
    )
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

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);


export default VisibleTodoList;