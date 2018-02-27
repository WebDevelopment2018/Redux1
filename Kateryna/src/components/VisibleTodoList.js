import React, {Component} from "react";
import TodoList from "./TodoList";
import { connect } from 'react-redux';

const getVisibleTodos = (todos,filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            // Use the `Array.filter()` method
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
}
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos (
            state.todos,
            state.visibilityFilter
        )
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    };
};
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);


export default VisibleTodoList;