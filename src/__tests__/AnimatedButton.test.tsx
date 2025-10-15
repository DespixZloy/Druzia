import { render, screen } from '@testing-library/react';
import AnimatedButton from '../components/AnimatedButton';

describe('AnimatedButton', () => {
  it('renders with text', () => {
    render(<AnimatedButton onClick={() => {}}>Click me</AnimatedButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
