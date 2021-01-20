import {ITodoItem} from './ITodoItem';

export class TodoService {
  private _todoItems: {[name: string]: ITodoItem} = {
    first: {name: 'First', isDone: true},
    second: {name: 'Second', isDone: false},
  };

  public getTodoItems(): ITodoItem[] {
    return Object.values(this._todoItems);
  }

  public createOrUpdateTodoItem(name: string, isDone: boolean) {
    const todoItem = this._todoItems[name.toLocaleLowerCase()];

    if (todoItem) {
      this._todoItems[name] = {...todoItem, isDone: isDone};
    } else {
      this._todoItems[name] = {name: name, isDone: isDone};
    }
  }
}
