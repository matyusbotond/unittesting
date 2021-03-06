import React from 'react';
import {Alert, FlatList, Platform} from 'react-native';
import {ITodoItem} from './ITodoItem';
import TodoListItem from './TodoItem';
import TodoListHeader from './TodoListHeader';

interface Props {
  todoItems: ITodoItem[];
  revertTodoItemFromDone: (item: ITodoItem) => void;
  setTodoItemToDone: (item: ITodoItem) => void;
  addNewItem: (name: string) => void;
}

interface State {}

export default class TodoList extends React.Component<Props, State> {
  private renderItem = ({item}: {item: ITodoItem}) => {
    return <TodoListItem todoItem={item} onPress={this._itemPressed} />;
  };

  private _itemPressed = (item: ITodoItem) => {
    if (item.isDone) {
      this.props.revertTodoItemFromDone(item);
    } else {
      this.props.setTodoItemToDone(item);
    }
  };
  private _newButtonPressed = () => {
    if (Platform.OS === 'android') {
      this.props.addNewItem(`${new Date().toISOString()}-todoItem`);
    } else {
      Alert.prompt('Adj meg egy nevet', undefined, (text: string) =>
        this.props.addNewItem(text),
      );
    }
  };

  public render() {
    return (
      <FlatList
        data={this.props.todoItems}
        renderItem={this.renderItem}
        style={{flex: 1}}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <TodoListHeader
            itemCount={this.props.todoItems.length}
            newButtonPressed={this._newButtonPressed}
          />
        }
      />
    );
  }
}
