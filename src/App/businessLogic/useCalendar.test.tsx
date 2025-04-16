import { renderHook } from '@testing-library/react';
import { useCalendar } from './businessLogic/useOfCalendar.ts';

describe('useCalendar hook', () => {
  test('initializes with current date', () => {
    const { result } = renderHook(() => useCalendar());
    const today = new Date();
    expect(result.current.valueDay).toBe(today.getDate());
    expect(result.current.year).toBe(today.getFullYear());
    expect(result.current.value).toBe(today.getMonth());
  });

  test('calendar contains correct number of days', () => {
    const { result } = renderHook(() => useCalendar());
    const totalDays = result.current.calendar.length;
    expect(totalDays).toBeGreaterThan(0);
    expect(totalDays).toBeLessThanOrEqual(366);
  });

  test('months array has 12 months', () => {
    const { result } = renderHook(() => useCalendar());
    expect(result.current.months.length).toBe(12);
  });

  test('weekdays array has 7 days', () => {
    const { result } = renderHook(() => useCalendar());
    expect(result.current.weekdays.length).toBe(7);
  });
});
