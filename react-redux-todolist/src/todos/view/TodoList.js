import React from 'react';
import {connect} from 'react-redux';
import { selectVisibleTodos} from "../selector";
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';
import {toggleTodo, removeTodo} from '../actions.js';

function TodoList({todos, onToggleTodo, onRemoveTodo}) {

    return (
        <ul className="todo-list">
            {
                todos.map((item) => (
                    <TodoItem
                        key={item.id}
                        text={item.text}
                        completed={item.completed}
                        onToggle={() => onToggleTodo(item.id)}
                        onRemove={() => onRemoveTodo(item.id)}
                    />
                ))
            }
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    todos: selectVisibleTodos(state)
});

const mapDispatchToProps = {
    onToggleTodo: toggleTodo,
    onRemoveTodo: removeTodo
};

/*const mapDispatchToProps = (dispatch) => ({
    onToggleTodo: (id) => {
        dispatch(toggleTodo(id));
    },
    onRemoveTodo: (id) => {
        dispatch(removeTodo(id));
    }
});*/

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);