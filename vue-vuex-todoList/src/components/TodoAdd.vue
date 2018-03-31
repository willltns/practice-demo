<template>
  <header class="todoapp">
    <h1>todos</h1>
    <input class="new-todo"
           type="text"
           autofocus
           placeholder="What needs to be done?"
           @keyup.enter="addTodo"/>
  </header>
</template>

<script>
export default {
  name: "todoAdd",

  methods: {
    addTodo (e) {
      const text = e.target.value;
      if (text.trim()) {
        this.$store.dispatch('addTodo', { text });
      }
      e.target.value ='';
    }
  }

}
</script>

<style scoped>

</style>
