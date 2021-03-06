import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders link to Home page', () => {
  const { getByText } = render(<App />);
  const homeLink = getByText('Create');
  expect(homeLink).toBeInTheDocument();
});

test('renders link to About page', () => {
  const { getByText } = render(<App />);
  const aboutLink = getByText('About');
  expect(aboutLink).toBeInTheDocument();
});

test('renders link to Feedback page', () => {
  const { getByText } = render(<App />);
  const feedbackLink = getByText('Feedback');
  expect(feedbackLink).toBeInTheDocument();
});
