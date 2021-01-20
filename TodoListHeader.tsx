import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  itemCount: number;
}

interface State {}

export default class TodoListHeader extends React.Component<Props, State> {
  public render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 10,
          marginBottom: 20,
          borderBottomWidth: 5,
        }}>
        <Text style={{flex: 1}}>A lista elemszáma</Text>
        <Text style={{flex: 1}}>{this.props.itemCount}</Text>
      </View>
    );
  }
}
