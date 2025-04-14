import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Arrows } from './arrows';

describe('Arrows Component', () => {
  const mockSetValue = jest.fn();
  const mockMonths = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 }
  ];

  beforeEach(() => {
    mockSetValue.mockClear();
  });

  test('clicking arrows changes month value correctly', () => {
    const { container } = render(
      <Arrows 
        value={3} 
        setValue={mockSetValue} 
        nextMonth="April" 
        months={mockMonths} 
      />
    );
    
    // Get arrows
    const arrows = container.querySelectorAll('a');
    
    // Click left arrow
    fireEvent.click(arrows[0]);
    expect(mockSetValue).toHaveBeenCalledWith(2);
    
    // Click right arrow
    fireEvent.click(arrows[1]);
    expect(mockSetValue).toHaveBeenCalledWith(4);
  });

  test('handles month boundary conditions', () => {
    // Test December -> January
    const { container: container1 } = render(
      <Arrows value={11} setValue={mockSetValue} nextMonth="December" months={mockMonths} />
    );
    fireEvent.click(container1.querySelectorAll('a')[1]);
    expect(mockSetValue).toHaveBeenCalledWith(0);
    
    // Test January -> December
    const { container: container2 } = render(
      <Arrows value={0} setValue={mockSetValue} nextMonth="January" months={mockMonths} />
    );
    fireEvent.click(container2.querySelectorAll('a')[0]);
    expect(mockSetValue).toHaveBeenCalledWith(11);
  });
});