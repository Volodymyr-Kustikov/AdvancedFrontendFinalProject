import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './form';

// ✅ Мокаем react-hook-form с типами
jest.mock('react-hook-form', () => {
  return {
    useForm: () => ({
      register: () => ({}),
      handleSubmit:
        (
          cb: (
            data: { title: string; note: string },
            e?: React.BaseSyntheticEvent
          ) => void
        ) =>
        (e: React.BaseSyntheticEvent) => {
          e.preventDefault();
          cb({ title: 'Test Title', note: 'Test Note' }, e);
        },
      formState: { errors: {} },
    }),
  };
});

describe('Form Component', () => {
  const mockSetPosts = jest.fn();
  const mockProps = {
    valueDay: 15,
    currentMonth: 'October',
    year: 2025,
    posts: [],
    setPosts: mockSetPosts,
  };

  it('renders input fields and submit button', () => {
    render(<Form {...mockProps} />);

    const titleInput = screen.getByRole('textbox', { name: '' });
    const noteInput = screen.getAllByRole('textbox')[1];
    const submitButton = screen.getByRole('button', { name: /try to click/i });

    expect(titleInput).toBeInTheDocument();
    expect(noteInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('submits form with mocked data', () => {
    render(<Form {...mockProps} />);

    const submitButton = screen.getByRole('button', { name: /try to click/i });
    fireEvent.click(submitButton);

    expect(mockSetPosts).toHaveBeenCalledWith([
      {
        title: 'Test Title',
        note: 'Test Note',
        date: '15.October.2025',
      },
    ]);
  });
});
