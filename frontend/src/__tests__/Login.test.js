// src/__tests__/Login.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

test('renders login form', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Example assertion
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});
