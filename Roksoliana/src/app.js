import {combineReducers, createStore} from 'redux';
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';

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
            return Object.assign({}, state, {
                completed: !state.completed
            });
        default:
            return state;
    }
};
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

const Link = ({
                  active,
                  children,
                  onClick
              }) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               onClick();
           }}
        >
            {children}
        </a>
    )
};

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active:
        ownProps.filter ===
        state.visibilityFilter
    }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(
                setVisibilityFilter(ownProps.filter)
            );
        }
    };
};
const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};
const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps)
(Link);
const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration:
                completed ?
                    'line-through' :
                    'none'
        }}
    >
        {text}
    </li>
);

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

const getVisibleTodos = (todos,
                         filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
};
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};
const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps)
(TodoList);

let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = ' ';
            }}>
                Add Todo
            </button>
        </div>
    );
};
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    };
};
AddTodo = connect()(AddTodo);
const Footer = () => (
    <p>
        Show:
        <FilterLink
            filter='SHOW_ALL'
        >
            All
        </FilterLink>
        {', '}
        <FilterLink
            filter='SHOW_ACTIVE'
        >
            Active
        </FilterLink>
        {', '}
        <FilterLink
            filter='SHOW_COMPLETED'
        >
            Completed
        </FilterLink>
    </p>
);

let nextTodoId = 0;
const TodoApp = () =>
    (
        <div>
            <AddTodo/>
            <VisibleTodoList/>
            <Footer/>
        </div>
    );

const render = () => {
    ReactDOM.render(
        <Provider store={createStore(todoApp)}>
            <TodoApp/>
        </Provider>,
        document.getElementById('root')
    )
};
render();

