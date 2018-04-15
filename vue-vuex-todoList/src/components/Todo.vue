<template>
  <li class="todo" :class="{completed: item.done, editing: editing }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="item.done"
        @change="toggleTodo(item)"/>
      <label v-text="item.text" @dblclick="editing = true" ></label>
      <button class="destroy" :class="{disp: !btnDisp}" @click="btnDisp = false; $nextTick( () => deleteTodo(item))"></button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="item.text"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="editing = false"/>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: "todo",

    props: [
      'item'
    ],

    data () {
      return {
        editing: false,
        btnDisp: true
      }
    },

    methods: {
      ...mapActions([
        'deleteTodo',
        'toggleTodo',
        'editTodo'
      ]),
      doneEdit (e) {
        const value = e.target.value.trim();
        const { item } = this;
        if (!value) {
          this.deleteTodo(item)
        } else if (this.editing){
          this.editTodo({
            item,
            value
          });
          this.editing = false;
        }
      }
    },

    directives: {
      focus (el, { value }, { context }) {
        if (value) {
          context.$nextTick(() => {
            el.focus()
          })
        }
      }
    }

  }
</script>

<style scoped>

  .disp {
    display: none !important;
  }
</style>
