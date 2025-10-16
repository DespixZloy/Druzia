import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('shows correct step and percent', () => {
    render(<ProgressBar currentStep={2} totalSteps={4} />);
    expect(screen.getByText('Шаг 2 из 4')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
