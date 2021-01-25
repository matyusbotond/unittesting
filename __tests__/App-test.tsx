import 'react-native';
import React from 'react';
import App from '../App';

import {fireEvent, render, waitForElementToBeRemoved} from '@testing-library/react-native';

describe('App', () => {
  describe('render', () => {
    it('renders correctly', () => {
      render(<App />);
    });
  });

  describe('must call', () => {
    it('deletes TodoItem if delete button is pressed', async () => {
      // Arrange
      const rendered = render(<App />);
      const deleteButton = rendered.getByTestId('delete-First');
      
      // Act
      const result = waitForElementToBeRemoved(() => rendered.getByA11yLabel('item-First'));
      fireEvent(deleteButton, 'onPress');

      // Arrange
      await result;

      /**
       * expect(rendered.getByA11yLabel('item-First')).toThrow();
       */
    })
  })
})
