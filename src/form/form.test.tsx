import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './form';

// Mock react-hook-form read info
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: () => ({}),
    handleSubmit: (cb) => (e) => {
      e.preventDefault();
      cb({ title: 'Test Title', note: 'Test Note' }, e);
    },
    formState: { errors: {} }
  })
}));

describe('Form Component', () => {
  const mockSetPosts = jest.fn();
  const mockProps = {
    valueDay: 15,
    currentMonth: 'October',
    year: 2025,
    posts: [],