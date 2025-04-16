import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders key UI elements', () => {
    render(<App />);

    expect(screen.getByText(/form/i)).toBeTruthy();
    expect(screen.getByText(/posts/i)).toBeTruthy();
  });
});
