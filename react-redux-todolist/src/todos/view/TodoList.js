import React from 'react';
import { connect } from 'react-redux';
import { selectVisibleTodos } from "../selector";
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

function TodoList({ todos }) {

    return (
        <ul className="todo-list">
            {
                todos.map((item) => (
                    <TodoItem
                        id={item.id}
                        key={item.id}
                        text={item.text}
                        completed={item.completed}
                    />
                ))
            }
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    todos: selectVisibleTodos(state)
});

export default connect(mapStateToProps)(TodoList);