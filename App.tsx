import React from 'react';
import {SafeAreaView} from 'react-native';

import {ITodoItem} from './ITodoItem';
import TodoList from './TodoList';

declare const global: {HermesInternal: null | {}};

interface Props {}

interface State {
  todoItems: {[key: string]: ITodoItem};
}

export default class App extends React.Component<Props, State> {
  state: State = {
    todoItems: {
      first: {name: 'First', isDone: true},
      second: {name: 'Second', isDone: false},
    },
  };

  public render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <TodoList
            todoItems={Object.values(this.state.todoItems)}
            setTodoItemToDone={(item) =>
              this.createOrUpdateTodoItem(item.name, true)
            }
            revertTodoItemFromDone={(item) =>
              this.createOrUpdateTodoItem(item.name, false)
            }
            addNewItem={(name) => this.createOrUpdateTodoItem(name, false)}
          />
        </SafeAreaView>
      </>
    );
  }

  public createOrUpdateTodoItem(name: string, isDone: boolean) {
    const todoItems = {...this.state.todoItems};
    const todoItemKey = name.toLocaleLowerCase();
    const todoItem = todoItems[todoItemKey];

    console.log(JSON.stringify(todoItem));

    if (todoItem) {
      todoItems[todoItemKey] = {...todoItem, isDone: isDone};
    } else {
      todoItems[todoItemKey] = {name: name, isDone: isDone};
    }

    this.setState({todoItems});
  }
}
