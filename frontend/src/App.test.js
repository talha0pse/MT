import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login heading', () => {
  render(<App />);
  const headings = screen.getAllByText(/login/i);
  // Check if at least one "Login" heading is present
  expect(headings[0]).toBeInTheDocument();
});
