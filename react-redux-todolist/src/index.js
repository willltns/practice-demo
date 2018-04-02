import './index.css';
import React from 'react';
import TodoApp from './TodoApp';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './Store.js';

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);