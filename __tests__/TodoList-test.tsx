import * as ReactNativeModule from 'react-native';
import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import TodoList from '../TodoList';
import { ITodoItem } from '../ITodoItem';
import TodoListItem from '../TodoItem';
import { create } from 'react-test-renderer';

let todoItems: ITodoItem[] = [
  { name: 'test', isDone: true }
];

let addNewItemMock = jest.fn();
let revertTodoItemFromDoneMock = jest.fn();
let setTodoItemToDoneMock = jest.fn();
let deleteTodoItemMock = jest.fn();

beforeEach(() => {
  todoItems = [
    { name: 'test', isDone: true },
    { name: 'test2', isDone: false }
  ];

  addNewItemMock = jest.fn();
  revertTodoItemFromDoneMock = jest.fn();
  setTodoItemToDoneMock = jest.fn();
});

ReactNativeModule.Platform.OS = 'android';

const createTodoItem = ({ todoItems = [
  { name: 'test', isDone: true },
  { name: 'test2', isDone: false }
], addNewItem = jest.fn(), revertTodoItemFromDone = jest.fn(), setTodoItemToDone = jest.fn(), deleteTodoItem = jest.fn() }) => {
  return <TodoList todoItems={todoItems} addNewItem={addNewItem} revertTodoItemFromDone={revertTodoItemFromDone} setTodoItemToDone={setTodoItemToDone} deleteTodoItem={deleteTodoItem} />
}

describe('TodoList', () => {
  describe('render', () => {
    it('list', () => {
      // Arrange      
      // Act
      const rendered = render(createTodoItem({}));
      // Assert
      rendered.getByA11yLabel('todoItemsList');
    });

    it('renders todoItems', () => {
      // Arrange      
      // Act
      const rendered = render(createTodoItem({}));
      // Assert
      const list = rendered.getByA11yLabel('todoItemsList');
      const items = list.findAllByType(TodoListItem);
      expect(items.length).toBe(todoItems.length);
    })
  });

  describe('must call', () => {
    it('calls addNewItem function when newButton is pressed on Android', () => {
      // Arrange 

      const rendered = render(createTodoItem({addNewItem: addNewItemMock}));
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
      const rendered = render(createTodoItem({todoItems: todoItems, revertTodoItemFromDone: revertTodoItemFromDoneMock}));
      const todoItemButton = rendered.getByA11yLabel('todoItemButton');

      // Act
      fireEvent(todoItemButton, 'onPress');

      // Arrange
      expect(revertTodoItemFromDoneMock).toBeCalledTimes(1);
    });

    it('calls setTodoItemToDone when NOT done todoItem\'s button is pressed', () => {
      // Arrange
      todoItems = [
        { name: 'test', isDone: false },
      ]
      const rendered = render(createTodoItem({todoItems, setTodoItemToDone: setTodoItemToDoneMock}));
      const todoItemButton = rendered.getByA11yLabel('todoItemButton');

      // Act
      fireEvent(todoItemButton, 'onPress');

      // Arrange
      expect(setTodoItemToDoneMock).toBeCalledTimes(1);
    });

    it('calls deleteTodoItem with TodoItem when delete button is pressed', () => {
      //Arrange
      const rendered = render(createTodoItem({todoItems, deleteTodoItem: deleteTodoItemMock}));
      const deleteButton = rendered.getByTestId(`delete-test`);
      // Act
      fireEvent(deleteButton, 'onPress');

      // Arrange
      expect(deleteTodoItemMock).toBeCalledTimes(1);
      expect(deleteTodoItemMock).toBeCalledWith(todoItems[0]);
    })
  })
});