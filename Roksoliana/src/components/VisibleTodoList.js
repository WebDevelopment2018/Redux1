import React from "react";
import TodoList from "./TodoList";
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers'


const mapStateToProps = (state, { match }) => ({
    todos: getVisibleTodos(state, match.params.filter || 'all' )
});
const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
)(TodoList));


export default VisibleTodoList;