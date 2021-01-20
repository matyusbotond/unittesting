import 'react-native';
import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import TodoListHeader from '../TodoListHeader';

describe('TodoListHeader', () => {
  describe('renders', () => {
    it('item count label', () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoListHeader itemCount={0} newButtonPressed={jest.fn()} />,
      );

      // Assert
      const label = rendered.getByA11yLabel('itemCountLabel');
      expect(label.props.children).toBe('A lista elemszáma');
    });
    it('item count', () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoListHeader itemCount={1} newButtonPressed={jest.fn()} />,
      );

      // Assert
      const label = rendered.getByA11yLabel('itemCount');
      expect(label.props.children).toBe(1);
    });
    it('new button', () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoListHeader itemCount={0} newButtonPressed={jest.fn()} />,
      );

      // Assert
      const button = rendered.getByA11yLabel('newButton');
      expect(button.props.children[0].props.children.props.children).toBe('Új');
    });
    it('container view with flex and row direction', () => {
      // Arrange
      // Act
      const rendered = render(
        <TodoListHeader itemCount={0} newButtonPressed={jest.fn()} />,
      );

      // Assert
      const view = rendered.getByTestId('todoListHeaderContainer');
      expect(view.props.style).toMatchObject({flex: 1, flexDirection: 'row'});
    });
  });
  describe('must call', () => {
    it('newButtonPressed function if newButton pressed', () => {
      // Arrange
      const newButtonPressedMock = jest.fn();
      const rendered = render(
        <TodoListHeader
          itemCount={0}
          newButtonPressed={newButtonPressedMock}
        />,
      );

      const button = rendered.getByA11yLabel('newButton');

      // Act
      fireEvent(button, 'onPress');

      // Assert
      expect(newButtonPressedMock).toBeCalled();
    });
  });
});
