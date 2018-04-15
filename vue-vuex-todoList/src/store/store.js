import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let nextId = 1;

const state = {
  todoList: []
};

const getters = {

};

const mutations = {
  addTodo (state, text) {
    state.todoList.push({
      id: nextId ++,
      text: text,
      done: false
    });
  },

  deleteTodo (state, item) {
    state.todoList.splice(state.todoList.indexOf(item), 1);
  },

  toggleTodo (state, item) {
    item.done = !item.done;
  },

  editTodo (state, { item, value}) {
    item.text = value;
  },

  toggleAll (state, { done }) {
    state.todoList.forEach(item => item.done = done);
  },

  clearCompleted (state) {
    state.todoList = state.todoList.filter( item => !item.done);
  }
};

const actions = {
  addTodo ({ commit }, { text }) {
    commit('addTodo', text);
  },
  deleteTodo ({ commit }, item) {
    commit('deleteTodo', item);
  },
  toggleTodo ({ commit }, item) {
    commit('toggleTodo', item);
  },
  toggleAll ({ commit }, done) {
    commit('toggleAll', done);
  },
  editTodo ({ commit }, content) {
    commit('editTodo', content);
  },
  clearCompleted ({ commit }) {
    commit('clearCompleted');
  }
};


export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

