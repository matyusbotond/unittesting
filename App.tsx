/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {ITodoItem} from './ITodoItem';
import TodoList from './TodoList';
import {TodoService} from './TodoService';

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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
