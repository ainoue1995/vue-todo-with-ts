import TodoItem from '../dto/dto.todos';

interface Storable {
    getItem(key: string): string | null;

    setItem(key: string, value: string): void;
}

const STORAGE_KEY = 'vue-todo-with-ts';

export default class TodoStorage {
    // newTodoのユニーク ID の採番用
    get nextId(): number {
        // return this.fetchAll().length + 1;
        let nextId: number;
        if (!this.fetchAll()) {
            nextId = 1;
        } else {
            nextId = this.fetchAll().slice(-1)[0].id + 1;
        }
        return nextId;
        // return this.fetchAll().slice(-1)[0].id + 1;
    }

    constructor(
        // デフォルト引数でローカルストレージを DI
        private storage: Storable = localStorage,
    ) {
    }

    // TODO リストを全件取得する
    public fetchAll(): TodoItem[] {
        const todoList = JSON.parse(
            this.storage.getItem(STORAGE_KEY) || '[]',
        ) as TodoItem[];
        todoList.forEach((todo, index) => todo.id = index + 1);
        return todoList;
    }

    // TODO リストを保存する
    public save(todoList: TodoItem[]) {
        this.storage.setItem(STORAGE_KEY, JSON.stringify(todoList));
    }

}


