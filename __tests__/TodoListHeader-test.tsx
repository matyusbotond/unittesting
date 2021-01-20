import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TodoListHeader from '../TodoListHeader';

it('renders correctly', () => {
  render(<TodoListHeader itemCount={0} newButtonPressed={jest.fn()} />);
});

it('render items count', () => {
  const rendered = render(
    <TodoListHeader itemCount={0} newButtonPressed={jest.fn()} />,
  );

  const itemCountText = rendered.getByA11yLabel('itemCount');

  expect(itemCountText.props.children).toBe(0);
});

it('should call newButtonPressed if user clicked new button', () => {
  const newButtonPressedMock = jest.fn();
  const rendered = render(
    <TodoListHeader itemCount={0} newButtonPressed={newButtonPressedMock} />,
  );

  const newButton = rendered.getByA11yLabel('newButton');

  fireEvent(newButton, 'onPress');

  expect(newButtonPressedMock).toBeCalled();
});
