import { createSelector } from 'reselect';
import { FilterTypes} from "../constants";

const getTodos = state => state.todos;
const getFilter = state => state.filter;

const selectVisibleTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    switch (filter) {
      case FilterTypes.ALL :
        return todos;
      case FilterTypes.UNCOMPLETED :
        return todos.filter(todo => !todo.completed);
      case FilterTypes.COMPLETED :
        return todos.filter(todo => todo.completed);
      default :
        throw new Error('unsupported filter types');
    }
  }
);

export { selectVisibleTodos };