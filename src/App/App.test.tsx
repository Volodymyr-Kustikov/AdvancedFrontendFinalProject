import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('render correct', () => {
    render(<App />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('send correct props into ListOfMonths', () => {
    render(<App />);
    // we proof props(i proof is it a correct(current) month in prop)
    const currentMonthElement = screen.getByText(new Date().toLocaleString('default', { month: 'long' }));
    expect(currentMonthElement).toBeInTheDocument();
  });
});
