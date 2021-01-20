import 'react-native';
import React from 'react';

import {render} from '@testing-library/react-native';
import TodoList from '../TodoList';
import TodoListItem from '../TodoItem';

describe('TodoList', () => {
  describe('renders', () => {
    it('list', () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoList
          addNewItem={jest.fn()}
          revertTodoItemFromDone={jest.fn()}
          setTodoItemToDone={jest.fn()}
          todoItems={[]}
        />,
      );

      // Assert
      rendered.getByA11yLabel('todoItemsList');
    });

    it("list's items", () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoList
          addNewItem={jest.fn()}
          revertTodoItemFromDone={jest.fn()}
          setTodoItemToDone={jest.fn()}
          todoItems={[{name: 'first', isDone: false}]}
        />,
      );

      // Assert
      const list = rendered.getByA11yLabel('todoItemsList');

      const items = list.findAllByType(TodoListItem);

      expect(items.length).toBe(1);
    });
  });
  describe('must call', () => {});
});
