import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {toggleTodo, removeTodo} from '../actions.js';


function TodoItem({id, text, completed, onToggle, onRemove}) {
    return (
        <li className="todo-item" style={{textDecoration: completed ? "line-through": "none"}}>
            <input className="toggle" type="checkbox" checked={completed ? "checked" : ""} readOnly onClick={onToggle}/>
            <label className="text">{text}</label>
            <button className="remove" onClick={onRemove}>X</button>
        </li>
    )
}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggle: () => dispatch(toggleTodo(ownProps.id)),
  onRemove: () => dispatch(removeTodo(ownProps.id))
});

export default connect(null, mapDispatchToProps)(TodoItem);