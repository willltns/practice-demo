import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

import './style.css';

export default () => (
    <div className="todos">
        <AddTodo/>
        <TodoList/>
    </div>
);