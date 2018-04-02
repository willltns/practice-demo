import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextTodoId++,
    text: text,
    completed: false
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id
});

export const removeTodo = (id) => ({
   type: REMOVE_TODO,
   id: id
});
