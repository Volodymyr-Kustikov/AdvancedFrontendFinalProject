import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CalendarMatrix } from './calendarMatrix';
import { Month } from './businessLogic/types.ts';

describe('CalendarMatrix', () => {
  const testMonth: Month = { name: 'January', days: 31 };
  const previousMonth: Month = { name: 'December', days: 31 };
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  test('renders calendar and handles clicks', () => {
    const setValueDay = jest.fn();
    const valueDay = 5;

    const { container } = render(
      <table>
        <tbody>
          {CalendarMatrix({
            monthDays: 31,
            currentMonth: testMonth,
            previousMonth,
            previousMonthDays: 31,
            setValueDay,
            valueDay,
            weekdays
          })}
        </tbody>
      </table>
    );

    const dayCell = container.querySelector('td');
    expect(dayCell).not.toBeNull();

    if (dayCell) {
      fireEvent.click(dayCell);
      expect(setValueDay).toHaveBeenCalled();
    }
  });
});
