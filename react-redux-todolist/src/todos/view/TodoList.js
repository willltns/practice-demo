import React from 'react';
import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import {toggleTodo, removeTodo} from '../actions.js';
import {FilterTypes} from '../../constants.js';
import PropTypes from 'prop-types';

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

const selectVisibleTodos = (todos, filter) => {
    switch (filter) {
        case FilterTypes.ALL: {
            return todos;
        }
        case FilterTypes.COMPLETED: {
            return todos.filter(item => item.completed);
        }
        case FilterTypes.UNCOMPLETED: {
            return todos.filter(item => !item.completed);
        }
        default:
            throw new Error('unsupported filter');
    }
};

const mapStateToProps = (state) => ({
    todos: selectVisibleTodos(state.todos, state.filter)
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