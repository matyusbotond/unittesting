import React from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {ITodoItem} from './ITodoItem';

interface Props {
  todoItem: ITodoItem;
  onPress: (item: ITodoItem) => void;
}

interface State {}

export default class TodoListItem extends React.Component<Props, State> {
  public render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 10,
          borderBottomWidth: 2,
        }}>
        <Text style={{flex: 1}}>{this.props.todoItem.name}</Text>
        <Text style={{flex: 1}}>
          {this.props.todoItem.isDone ? 'done' : 'unresolved'}
        </Text>
        <Button
          title={!this.props.todoItem.isDone ? 'kész' : 'visszavonás'}
          onPress={() =>
            this.props.onPress
              ? this.props.onPress(this.props.todoItem)
              : Alert.alert(`${this.props.todoItem.name} is pressed`)
          }
        />
      </View>
    );
  }
}
