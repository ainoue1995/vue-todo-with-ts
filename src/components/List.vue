<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo"
               @keypress.enter="addTodo()">
        <div v-for="(todo, index) in todoList" :key="todoList.id" class="todo-item">
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed" @change="checkTodo(todo)">
                <!--                <input type="checkbox" v-model="todo.completed">-->
                <div class="todo-item-label" v-if="!todo.editing"
                     @dblclick="editTodo(todo)" v-bind:class="{ completed: todo.completed}">{{todo.title}}
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
                <label><input type="checkbox" v-bind:checked="!anyRemaining" @change="checkAllTodos"> Check All</label>
            </div>
            <div>{{remaining}} {{remaining | pluralize}} left</div>

        </div>
        <pre>newTodo: {{newTodo}}</pre>
        <pre>todoList: {{todoList}}</pre>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import {Component, Emit, Prop, Watch} from 'vue-property-decorator';
    import TodoStorage from '@/components/TodoStorage';
    import TodoItem from '@/dto/dto.todos';

    const todoStorage = new TodoStorage();

    @Component({})
    export default class ListComponent extends Vue {

        // Propの意味がわかってないけど、とりあえずつけてみた。
        @Prop() public newTodo!: string;
        @Prop() public beforeEditCache!: string;
        @Prop() public todoList!: TodoItem[];

        constructor() {
            super();
            this.todoList = todoStorage.fetchAll();
            // this.todoList.push({
            //         id: 1,
            //         title: 'やらなぁあかんこと',
            //         completed: false,
            //         editing: false,
            //     },
            //     {
            //         id: 2,
            //         title: 'めっちゃやらなぁあかんこと',
            //         completed: false,
            //         editing: false,
            //     },
            // );
        }

        public get remaining(): number {
            return this.todoList.filter(todo => !todo.completed).length;
        }

        public get anyRemaining() {
            return this.remaining !== 0;
        }

        public addTodo() {
            if (this.newTodo.trim().length === 0) {
                return;
            }

            if (this.todoList) {
                this.todoList.push({
                    id: todoStorage.nextId,
                    title: this.newTodo,
                    completed: false,
                    editing: false,
                });
            }
            this.newTodo = '';
        }

        public editTodo(todo: TodoItem) {
            todo.editing = true;
            this.beforeEditCache = todo.title;
        }

        public doneEdit(todo: TodoItem) {
            todo.editing = false;
            if (todo.title.trim() === '') {
                todo.title = this.beforeEditCache;
            }
        }

        public deleteTodo(index: number) {
            if (this.todoList) {
                this.todoList.splice(index, 1);
            }
        }

        // public checkTodo(todo: TodoItem[], completed: boolean) {
        //     this.$emit('checkTodo', todo, completed);
        // }

        // public checkAllTodos() {
        //     this.todoList.forEach((todo) => todo.completed = );
        // }

        @Watch('todoList', {deep: true})
        private onTodoChanged(todoList: TodoItem[]) {
            todoStorage.save(todoList);
        }


    }
</script>

<style lang="scss">
    @import "../stylesheets/style";
</style>
