import { render, screen } from '@testing-library/react';
import RatingInput from '../components/RatingInput';

describe('RatingInput', () => {
  it('renders correct number of stars', () => {
    render(<RatingInput value={3} max={5} onChange={() => {}} />);
    // There should be 5 buttons (stars)
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });
});
