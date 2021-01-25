import 'react-native';
import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import TodoListItem from '../TodoItem';
import { ITodoItem } from '../ITodoItem';
import { Text } from 'react-native';

const createTodoListItem = ({ accessibilityLabel = 'test', onToggleStatus = jest.fn(), todoItem = { isDone: false, name: 'test-item' }, onDelete = jest.fn() }) => {
  return <TodoListItem accessibilityLabel={accessibilityLabel} onToggleStatus={onToggleStatus} todoItem={todoItem} onDelete={onDelete} />
}

describe('TodoItem', () => {
  describe('render', () => {
    it('item name', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: true,
        name: 'test-name'
      }

      // Act
      const rendered = render(createTodoListItem({ todoItem }));

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
      const rendered = render(createTodoListItem({ todoItem }));

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
      const rendered = render(createTodoListItem({ todoItem }));

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
      const rendered = render(createTodoListItem({ todoItem }));

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
      const rendered = render(createTodoListItem({ todoItem }));

      // Assert
      const button = rendered.getByA11yLabel('todoItemButton');
      expect(button.props.children[0].props.children.props.children).toBe('kész');
    });

    it('renders a delete button with "Delete" label', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: false,
        name: 'test-name'
      }

      // Act
      const rendered = render(createTodoListItem({ todoItem }))

      // Assert
      const deleteButton = rendered.getByA11yLabel('deleteButton');
      expect(deleteButton.findByType(Text).props.children).toBe('Delete');
      expect(deleteButton).toBeTruthy();
    });
  });

  describe('must call', () => {
    it('onToggleStatus function is called with todoItem if button is pressed', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: true,
        name: 'test-name'
      }
      const onToggleStatusMock = jest.fn();
      const rendered = render(createTodoListItem({ onToggleStatus: onToggleStatusMock, todoItem }));
      const button = rendered.getByA11yLabel('todoItemButton');

      // Act
      fireEvent(button, 'onPress');

      // Assert
      expect(onToggleStatusMock).toBeCalledWith(todoItem);
    });

    it('onDelete function called with TodoItem if delete button is pressed', () => {
      // Arrange
      const todoItem: ITodoItem = {
        isDone: true,
        name: 'test-name'
      };
      const onDeleteMock = jest.fn();
      const rendered = render(createTodoListItem({ onDelete: onDeleteMock, todoItem }));
      const deleteButton = rendered.getByA11yLabel('deleteButton');
      // Act
      fireEvent(deleteButton, 'onPress');
      //Assert
      expect(onDeleteMock).toBeCalledTimes(1);
      expect(onDeleteMock).toBeCalledWith(todoItem);
    })
  })
});