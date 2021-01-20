import * as ReactNativeModule from 'react-native';
import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import TodoList from '../TodoList';
import { ITodoItem } from '../ITodoItem';
import TodoListItem from '../TodoItem';

let todoItems: ITodoItem[] = [
  { name: 'test', isDone: true }
];

let addNewItemMock = jest.fn();
let revertTodoItemFromDone = jest.fn();
let setTodoItemToDone = jest.fn();

beforeEach(() => {
  todoItems = [
    { name: 'test', isDone: true },
    { name: 'test2', isDone: false}
  ];
  
  addNewItemMock = jest.fn();
  revertTodoItemFromDone = jest.fn();
  setTodoItemToDone = jest.fn();  
})

ReactNativeModule.Platform.OS = 'android';

describe('TodoList', () => {
  describe('render', () => {
    it('list', () => {
      // Arrange      
      // Act
      const rendered = render(
        <TodoList
          todoItems={todoItems}
          addNewItem={addNewItemMock}
          revertTodoItemFromDone={revertTodoItemFromDone}
          setTodoItemToDone={setTodoItemToDone}
        />
      );
      // Assert
      rendered.getByA11yLabel('todoItemsList');
    });

    it('renders todoItems', () => {
      // Arrange      
      // Act
      const rendered = render(
        <TodoList
          todoItems={todoItems}
          addNewItem={addNewItemMock}
          revertTodoItemFromDone={revertTodoItemFromDone}
          setTodoItemToDone={setTodoItemToDone}
        />
      );
      // Assert
      const list = rendered.getByA11yLabel('todoItemsList');
      const items = list.findAllByType(TodoListItem);
      expect(items.length).toBe(todoItems.length);
    })
  });

  describe('must call', () => {
    it('calls addNewItem function when newButton is pressed on Android', () => {
      // Arrange 

      const rendered = render(
        <TodoList
          todoItems={todoItems}
          addNewItem={addNewItemMock}
          revertTodoItemFromDone={revertTodoItemFromDone}
          setTodoItemToDone={setTodoItemToDone}
        />
      );
      const newButton = rendered.getByA11yLabel('newButton');
      // Act
      fireEvent(newButton, 'onPress');

      // Assert
      expect(addNewItemMock).toBeCalledTimes(1);
    });

    it('calls revertTodoItemFromDone when done todoItem\'s button is pressed', () => {
      // Arrange
      todoItems = [
        { name: 'test', isDone: true }, 
      ]
      const rendered = render(
        <TodoList
          todoItems={todoItems}
          addNewItem={addNewItemMock}
          revertTodoItemFromDone={revertTodoItemFromDone}
          setTodoItemToDone={setTodoItemToDone}
        />
      );
      const todoItemButton = rendered.getByA11yLabel('todoItemButton');

      // Act
      fireEvent(todoItemButton, 'onPress');

      // Arrange
      expect(revertTodoItemFromDone).toBeCalledTimes(1);
    });

    it('calls setTodoItemToDone when NOT done todoItem\'s button is pressed', () => {
      // Arrange
      todoItems = [
        { name: 'test', isDone: false }, 
      ]
      const rendered = render(
        <TodoList
          todoItems={todoItems}
          addNewItem={addNewItemMock}
          revertTodoItemFromDone={revertTodoItemFromDone}
          setTodoItemToDone={setTodoItemToDone}
        />
      );
      const todoItemButton = rendered.getByA11yLabel('todoItemButton');

      // Act
      fireEvent(todoItemButton, 'onPress');

      // Arrange
      expect(setTodoItemToDone).toBeCalledTimes(1);
    })
  })
});