<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo"
               @keypress.enter="addTodo()">
        <div v-for="(todo, index) in todoList" :key="todoList.id" class="todo-item">
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed" @change="checkTodo(todo)">
                <div class="todo-item-label" v-if="!todo.editing"
                     @dblclick="editTodo(todo)" :class="{ completed: todo.completed}">{{todo.title}}
                </div>
                <input type="text" v-else v-model="todo.title" class="todo-item-edit"
                       @blur="doneEdit(todo)" @keypress.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
            </div>
            <div class="delete-item" @click="deleteTodo(index)">
                &times;
            </div>
        </div>
        <div class="extra-container">
            <div>
                <label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check All</label>
            </div>
            <div>{{remaining}} {{remaining | pluralize}} left</div>

        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop, Watch} from 'vue-property-decorator';
    import TodoItem from "@/dto/dto.todos";

    @Component({})
    export default class ListComponent extends Vue {
        @Prop()
        todo: string = '';
        idForTodo: number = 1;
        newTodo: string = '';
        todoList: TodoItem[];

        constructor() {
            super();
            this.todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        }

        addTodo() {
            if (this.newTodo.trim().length === 0) {
                return;
            }

            this.todoList.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
                editing: false,
            });

            this.newTodo = '';
            this.idForTodo++;
            this.setTodos();
        }

        deleteTodo(index: number) {
            this.todoList.splice(index, 1);
            this.setTodos();
        }

        setTodos() {
            localStorage.setItem("todoList", JSON.stringify(this.todoList));
            this.setTodos();
        }

        @Watch('todoList', {deep: true})
        onChange(newTodo: string, old: string) {
            console.log('changed', old, '->', newTodo);
        }

    }
</script>

<style lang="scss">
    @import "../stylesheets/style";
</style>
