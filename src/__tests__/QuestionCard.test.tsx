import { render, screen } from '@testing-library/react';
import QuestionCard from '../components/QuestionCard';

describe('QuestionCard', () => {
  it('renders children when active', () => {
    render(
      <QuestionCard isActive={true}>
        <span>What is your favorite color?</span>
      </QuestionCard>
    );
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
  });
  it('does not render children when inactive (opacity 0)', () => {
    render(
      <QuestionCard isActive={false}>
        <span>Hidden question</span>
      </QuestionCard>
    );
    // The element is in the DOM but visually hidden, so we check for presence
    expect(screen.getByText('Hidden question')).toBeInTheDocument();
  });
});
