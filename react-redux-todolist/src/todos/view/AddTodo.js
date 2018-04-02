import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addTodo} from "../actions";

class AddTodo extends Component {
    constructor(props, context) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {value: ''};
    }

    componentDidMount() {
        this.refInput.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        const inputValue = this.state.value;
        if (!inputValue.trim()) {
            alert("cannot be empty!");
        } else {
            this.props.onAdd(inputValue);
        }
        this.setState({value: ''});
        event.target.firstElementChild.focus();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render() {
        return (
            <div className="add-todo">
                <form onSubmit={this.onSubmit}>
                    <input className="new-todo" ref={input => this.refInput = input} onChange={this.handleChange} value={this.state.value}/>
                    <button className="add-btn" type="submit">添加</button>
                </form>
            </div>
        );
    }
}

AddTodo.propTypes = {
    onAdd: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (text) => {
            dispatch(addTodo(text));
        }
    }
};

export default connect(null, mapDispatchToProps)(AddTodo);