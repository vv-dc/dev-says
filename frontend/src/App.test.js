import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage text', () => {
  render(<App />);
  const headingTag = screen.getByText('DevSays homepage');
  expect(headingTag).toBeInTheDocument();
});
