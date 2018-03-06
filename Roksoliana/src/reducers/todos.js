import {todo} from "../actions/todo";


export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return state.map(undefined => todo(undefined,action));
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};
export const getVisibleTodos = (state, filter) => {
    switch (filter) {
        case 'all':
            return state;
        case 'completed':
            return state.filter(t => t.completed);
        case 'active':
            return state.filter(t => !t.completed);
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
};
export default todos;