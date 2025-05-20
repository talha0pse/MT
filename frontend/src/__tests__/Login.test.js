import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

test('renders Login heading', () => {
  render(<Login />);
  const heading = screen.getByText(/login/i);
  expect(heading).toBeInTheDocument();
});
