import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamDetails from '../components/TeamDetails';

it('should render the inputted team ids', () => {
  const { getByText } = render(<TeamDetails inputValue="123" inputValue2="456" />);
  expect(getByText(/Team Id: 123/i)).toBeInTheDocument();
  expect(getByText(/Team Id 2: 456/i)).toBeInTheDocument();
});