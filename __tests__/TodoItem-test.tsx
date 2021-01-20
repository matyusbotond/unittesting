import 'react-native';
import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import TodoListItem from '../TodoItem';
import { ITodoItem } from '../ITodoItem';

describe('TodoItem', () => {
  describe('render', () => {
    it('item name', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: true,
        name: 'test-name'
      }

      // Act
      const rendered = render(<TodoListItem accessibilityLabel="test" onPress={jest.fn()} todoItem={todoItem} />);

      // Assert
      const name = rendered.getByA11yLabel('todoItemName');
      expect(name.props.children).toBe(todoItem.name);
    });

    it('item status if item isDone', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: true,
        name: 'test-name'
      }

      // Act
      const rendered = render(<TodoListItem accessibilityLabel="test" onPress={jest.fn()} todoItem={todoItem} />);

      // Assert
      const status = rendered.getByA11yLabel('todoItemStatus');
      expect(status.props.children).toBe('kész');
    });

    it('item status if item !isDone', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: false,
        name: 'test-name'
      }

      // Act
      const rendered = render(<TodoListItem accessibilityLabel="test" onPress={jest.fn()} todoItem={todoItem} />);

      // Assert
      const status = rendered.getByA11yLabel('todoItemStatus');
      expect(status.props.children).toBe('folyamatban');
    })

    it('button label if item isDone', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: true,
        name: 'test-name'
      }

      // Act
      const rendered = render(<TodoListItem accessibilityLabel="test" onPress={jest.fn()} todoItem={todoItem} />);

      // Assert
      const button = rendered.getByA11yLabel('todoItemButton');
      expect(button.props.children[0].props.children.props.children).toBe('visszavonás');
    });

    it('button label if item !isDone', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: false,
        name: 'test-name'
      }

      // Act
      const rendered = render(<TodoListItem accessibilityLabel="test" onPress={jest.fn()} todoItem={todoItem} />);

      // Assert
      const button = rendered.getByA11yLabel('todoItemButton');
      expect(button.props.children[0].props.children.props.children).toBe('kész');
    });
  });

  describe('must call', () => {
    it('onPress function with todoItem if button is pressed', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: true,
        name: 'test-name'
      }
      const onPressMock = jest.fn();
      const rendered = render(<TodoListItem accessibilityLabel="test" onPress={onPressMock} todoItem={todoItem} />);
      const button = rendered.getByA11yLabel('todoItemButton');

      // Act
      fireEvent(button, 'onPress');

      // Assert
      expect(onPressMock).toBeCalledWith(todoItem);
    })
  })
});