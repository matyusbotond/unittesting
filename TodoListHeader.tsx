import React from 'react';
import {Button, Text, View} from 'react-native';

interface Props {
  itemCount: number;
  newButtonPressed: () => void;
}

interface State {}

export default class TodoListHeader extends React.Component<Props, State> {
  public render() {
    return (
      <View
        testID="todoListHeaderContainer"
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 10,
          marginBottom: 20,
          borderBottomWidth: 5,
        }}>
        <Text accessibilityLabel="itemCountLabel" style={{flex: 1}}>A lista elemszáma</Text>
        <Text accessibilityLabel="itemCount" style={{flex: 1}}>
          {this.props.itemCount}
        </Text>
        <Button
          accessibilityLabel="newButton"
          title="Új"
          onPress={this.props.newButtonPressed}
        />
      </View>
    );
  }
}
