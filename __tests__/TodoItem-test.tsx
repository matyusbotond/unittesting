import 'react-native';
import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import TodoItem from '../TodoItem';
import {Text} from 'react-native';

describe('TodoItem', () => {
  describe('renders', () => {
    it("todoitem's name", () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoItem
          todoItem={{name: 'first', isDone: true}}
          onPress={jest.fn()}
        />,
      );

      // Assert
      const label = rendered.getByA11yLabel('todoItemName');
      expect(label.props.children).toBe('first');
    });
    it("todoitem's status when it is done", () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoItem
          todoItem={{name: 'first', isDone: true}}
          onPress={jest.fn()}
        />,
      );

      // Assert
      const label = rendered.getByA11yLabel('todoItemStatus');
      expect(label.props.children).toBe('kész');
    });

    it("todoitem's status when it is not done", () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoItem
          todoItem={{name: 'first', isDone: false}}
          onPress={jest.fn()}
        />,
      );

      // Assert
      const label = rendered.getByA11yLabel('todoItemStatus');
      expect(label.props.children).toBe('folyamatban');
    });

    it("todoitem's status change button when it is done", () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoItem
          todoItem={{name: 'first', isDone: true}}
          onPress={jest.fn()}
        />,
      );

      // Assert
      const button = rendered.getByA11yLabel('todoItemChangeStatus');
      const title = button.findByType(Text);
      expect(title.props.children).toBe('visszavonás');
    });
    it("todoitem's status change button when it is not done", () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoItem
          todoItem={{name: 'first', isDone: false}}
          onPress={jest.fn()}
        />,
      );

      // Assert
      const button = rendered.getByA11yLabel('todoItemChangeStatus');
      const title = button.findByType(Text);
      expect(title.props.children).toBe('kész');
    });
    it('container view with flex and row direction', () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoItem
          todoItem={{name: 'first', isDone: false}}
          onPress={jest.fn()}
        />,
      );

      // Assert
      const view = rendered.getByTestId('todoListItemViewContainer');
      expect(view.props.style).toMatchObject({flex: 1, flexDirection: 'row'});
    });
  });
  describe('must call', () => {
    it('onPress function if todoItemChangeStatus button pressed', () => {
      // Arrange
      const onPressedMock = jest.fn();
      const todoItem = {name: 'first', isDone: false};
      const rendered = render(
        <TodoItem todoItem={todoItem} onPress={onPressedMock} />,
      );

      const button = rendered.getByA11yLabel('todoItemChangeStatus');

      // Act
      fireEvent(button, 'onPress');

      // Assert
      expect(onPressedMock).toBeCalledWith(todoItem);
    });
  });
});
