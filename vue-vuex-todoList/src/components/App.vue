<style src="../index.css"></style>

<template>
  <section class="app">

    <todo-add></todo-add>

    <transition name="follow">
      <section class="status" v-show="todoList.length">
        <span class="todo-count">
          {{remaining | pluralize(' item')}}
        </span>
        <ul class="filters">
          <li v-for="(val, key) in filters">
            <a :href="'#/' + key"
               :class="{selected: visibility === key}"
               @click="visibility = key">{{key | capitalize}}</a>
          </li>
        </ul>
        <button class="clear-completed"
                v-show="todoList.some(item => item.done)"
                @click="clearCompleted">
          Clear completed
        </button>
      </section>
    </transition>
    <transition name="last-del">
      <section class="main" v-show="todoList.length">
        <input class="toggle-all" id="toggle-all"
          type="checkbox"
          :checked="allChecked"
          @change="toggleAll({done: !allChecked})"/>
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <transition-group name="fade">
            <todo class="trans-item" v-for="item in filteredTodoList" :item="item" :key="item.id"></todo>
          </transition-group>
        </ul>
      </section>
    </transition>
  </section>
</template>

<script>
import TodoAdd from './TodoAdd';
import Todo from './Todo';
import { mapActions } from  'vuex';

const filters = {
  all: todoList => todoList,
  active: todoList => todoList.filter(item => !item.done),
  completed: todoList => todoList.filter(item => item.done)
};

export default {
  name: 'app',

  components: { TodoAdd, Todo },

  data () {
    return {
      visibility: 'all',
      filters: filters
    }
  },

  methods: {
    addTodo (e) {
      const text = e.target.value;
      if (text.trim()) {
        this.$store.dispatch('addTodo', { text });
      }
      e.target.value ='';
    },
    toggleAll (done) {
      this.$store.dispatch('toggleAll', done);
    },
    ...mapActions([
      'clearCompleted'
    ])
  },
  computed: {
    todoList () {
      return this.$store.state.todoList;
    },
    filteredTodoList () {
      return filters[this.visibility](this.todoList);
    },
    allChecked () {
      return this.$store.state.todoList.every( item => item.done);
    },
    remaining () {
      return this.todoList.filter(item => !item.done).length;
    }
  },
  filters: {
    pluralize (n, w) {
      switch (n) {
        case 0 :
          return 'all completed!  :)';
          break;
        case 1 :
          return n + w + ' left';
          break;
        default :
          return n + w + 's left';
          break;
      }
    },
    capitalize: w => w.charAt(0).toUpperCase() + w.slice(1)
  }
}
</script>

<style scoped>

  .trans-item {
    transition: all .5s;
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .fade-leave-active {
    position: absolute;
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  .fade-move:not(.fade-leave-active) {
    transition: transform .5s;
  }

  .follow-enter {
    opacity: 0;
  }

  .follow-enter-active {
    transition: all .5s;
  }

  .follow-enter-to {
    opacity: 1;
  }

  .last-del-leave-active,
  .follow-leave-active {
    transition: all .5s;
  }

  .last-del-leave-to,
  .follow-leave-to {
    opacity: 0;
  }

</style>
