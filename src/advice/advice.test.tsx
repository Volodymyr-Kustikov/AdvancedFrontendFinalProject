import React from 'react';
import { render, screen } from '@testing-library/react';
import { Advice } from './advice';
import '@testing-library/jest-dom';

const mockProps = {
  value: 0,
  setValue: jest.fn(),
  nextMonth: 'January',
  months: []
};

describe('Advice Component', () => {
  test('renders the component with correct text', () => {
    render(<Advice {...mockProps}/>);
    
    expect(screen.getByText('Set ur death date !')).toBeInTheDocument();
  });

  test('renders two arrow SVGs', () => {
    render(<Advice {...mockProps}/>);
    
    const svgs = document.querySelectorAll('svg');
    
    expect(svgs.length).toBe(2);
  });
});