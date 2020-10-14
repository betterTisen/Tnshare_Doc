//  ./src/stores/todo.ts
import { action, observable, computed } from 'mobx';

export interface ITodo {
  id: number;
  name: string;
  desc: string;
  done?: boolean;
}

let id = 0;

export class TodoStore {
  @observable todos: ITodo[] = [];

  // 利用计算属性计算完成个未完成个数
  @computed get doneCount() {
    return this.todos.filter(todo => todo.done).length;
  }

  @computed get undoneCount() {
    return this.todos.filter(todo => !todo.done).length;
  }

  // 添加一个 Todo
  @action.bound addNewTodo() {
    const i = id++;
    console.log(this.todos.length)
    const todo = {
      name: "new task" + i,
      desc: "new task" + i,
      id: i,
      done: false,
    }
    this.todos = [...this.todos, todo];
  }

  // 删除一个 Todo
  @action.bound removeById(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // 切换 done 状态
  @action.bound toggleStatusById(id: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
  }
}

export const STORE_TODO = 'todoStore';
