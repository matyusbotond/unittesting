import React from 'react';
import {Button, Text, View} from 'react-native';
import {ITodoItem} from './ITodoItem';

interface Props {
  todoItem: ITodoItem;
  onPress: (item: ITodoItem) => void;
  accessibilityLabel?: string;
}

interface State {}

export default class TodoListItem extends React.Component<Props, State> {
  public render() {
    return (
      <View
        testID="todoListItemViewContainer"
        style={{
          flex: 1,
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 10,
          borderBottomWidth: 2,
        }}>
        <Text accessibilityLabel="todoItemName" style={{flex: 1}}>
          {this.props.todoItem.name}
        </Text>
        <Text accessibilityLabel="todoItemStatus" style={{flex: 1}}>
          {this.props.todoItem.isDone ? 'kész' : 'folyamatban'}
        </Text>
        <Button
          accessibilityLabel="todoItemChangeStatus"
          title={!this.props.todoItem.isDone ? 'kész' : 'visszavonás'}
          onPress={() => this.props.onPress(this.props.todoItem)}
        />
      </View>
    );
  }
}
