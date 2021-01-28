import * as ReactNativeModule from 'react-native';
import 'react-native';
import React from 'react';
import App from '../App';

import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import TodoListItem from '../TodoItem';

ReactNativeModule.Platform.OS = 'android';

describe('App', () => {
  describe('render', () => {
    it('renders correctly', () => {
      render(<App />);
    });

    it('renders TodoListHeader', () => {
      // Arrange
      const rendered = render(<App />);
      // Act
      const header = rendered.getByTestId('todoListHeaderContainer');

      // Assert
      expect(header).toBeTruthy();
    });

    it('renders TodoList', () => {
      // Arrange
      const rendered = render(<App />);
      // Act
      const list = rendered.getByA11yLabel('todoItemsList');
      // Assert
      expect(list.findAllByType(TodoListItem).length).toEqual(2);
    });
  });

  describe('must call', () => {
    it('deletes TodoItem if delete button is pressed', async () => {
      // Arrange
      const rendered = render(<App />);
      const deleteButton = rendered.getByTestId('delete-First');

      // Act
      const result = waitForElementToBeRemoved(() =>
        rendered.getByA11yLabel('item-First'),
      );
      fireEvent(deleteButton, 'onPress');

      // Assert
      await result;

      /**
       * expect(rendered.getByA11yLabel('item-First')).toThrow();
       */
    });

    it('updates header item count when delete button is pressed', async () => {
      // Arrange
      const rendered = render(<App />);
      const deleteButton = rendered.getByTestId('delete-First');
      // Act
      const originalCount = rendered.getByA11yLabel('itemCount').props.children;
      fireEvent(deleteButton, 'onPress');
      // Assert
      const newCount = rendered.getByA11yLabel('itemCount').props.children;
      expect(newCount).toEqual(originalCount - 1);
    });

    it('updates header item count when new button is pressed', () => {
      // Arrange
      const rendered = render(<App />);
      const newButton = rendered.getByA11yLabel('newButton');

      // Act
      const originalCount = rendered.getByA11yLabel('itemCount').props.children;
      fireEvent(newButton, 'onPress');

      // Assert
      const newCount = rendered.getByA11yLabel('itemCount').props.children;
      expect(newCount).toEqual(originalCount + 1);
    });

    it('adds new item to list when new button is pressed', () => {
      // Arrange
      const rendered = render(<App />);
      const newButton = rendered.getByA11yLabel('newButton');
      const originalList = rendered.getByA11yLabel('todoItemsList');
      const originalCount = originalList.findAllByType(TodoListItem).length;

      // Act
      fireEvent(newButton, 'onPress');

      // Assert
      const newList = rendered.getByA11yLabel('todoItemsList');
      const newCount = newList.findAllByType(TodoListItem).length;
      expect(newCount).toEqual(originalCount + 1);
    });
  });
});
