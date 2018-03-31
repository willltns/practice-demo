<template>
  <section class="main" v-show="todoList.length">
    <input class="toggle-all" id="toggle-all"
           type="checkbox"
           :checked="allChecked"
           @change="toggleAll({done: !allChecked})"/>
    <label for="toggle-all"></label>
    <ul class="todo-list">
      <todo v-for="(item, index) in filteredTodoList" :item="item" :key="index"></todo>
    </ul>
  </section>
</template>

<script>
import Todo from './Todo';

export default {
  name: "todo-list",

  components: { Todo },

  data () {
    return {
      visibility: 'all'
    }
  },

  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
    filteredTodoList() {
      return this.$store.state.filters[this.visibility](this.todoList);
    },
    allChecked() {
      return this.$store.state.todoList.every(item => item.done);
    }
  }
}
</script>

<style scoped>

</style>
