import React from 'react';
import { render, screen } from '@testing-library/react';
import { Advice } from './advice';

describe('Advice Component', () => {
  test('renders the component with correct text', () => {
    render(<Advice />);
    
    expect(screen.getByText('Set ur death date !')).toBeInTheDocument();
  });

  test('renders two arrow SVGs', () => {
    render(<Advice />);
    
    const svgs = document.querySelectorAll('svg');
    
    expect(svgs.length).toBe(2);
  });
});