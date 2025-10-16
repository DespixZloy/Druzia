
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: async () => ({ error: null })
    })
  }
}));

describe('App', () => {
  it('renders survey title', () => {
    render(<App />);
    expect(screen.getByText(/Опросник о Ваших предпочтениях/i)).toBeInTheDocument();
  });

  it('completes the survey flow', async () => {
    render(<App />);
    // Step 1: Name
    const nameInput = screen.getByPlaceholderText(/Введите ваше имя/i);
    fireEvent.change(nameInput, { target: { value: 'Ivan' } });
    const visibleButtons1 = screen.getAllByRole('button').filter(
      btn => !btn.className.includes('pointer-events-none')
    );
    const nextBtn1 = visibleButtons1.find(btn => btn.textContent === 'Далее');
    expect(nextBtn1).toBeDefined();
    expect(nextBtn1).not.toBeDisabled();
  fireEvent.click(nextBtn1!);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/example@mail.com/i)).toBeInTheDocument();
    });
    // Step 2: Email
    const emailInput = screen.getByPlaceholderText(/example@mail.com/i);
    fireEvent.change(emailInput, { target: { value: 'ivan@example.com' } });
    const visibleButtons2 = screen.getAllByRole('button').filter(
      btn => !btn.className.includes('pointer-events-none')
    );
    const nextBtn2 = visibleButtons2.find(btn => btn.textContent === 'Далее');
    expect(nextBtn2).toBeDefined();
    expect(nextBtn2).not.toBeDisabled();
  fireEvent.click(nextBtn2!);
    await waitFor(() => {
      expect(screen.getByText(/Какой ваш любимый цвет/i)).toBeInTheDocument();
    });
    // Step 3: Favorite color
    const visibleButtons3 = screen.getAllByRole('button').filter(
      btn => !btn.className.includes('pointer-events-none')
    );
    const colorBtn = visibleButtons3.find(btn => btn.textContent === 'Синий');
    expect(colorBtn).toBeDefined();
  fireEvent.click(colorBtn!);
    await waitFor(() => {
      const visibleButtons3b = screen.getAllByRole('button').filter(
        btn => !btn.className.includes('pointer-events-none')
      );
      const nextBtn3 = visibleButtons3b.find(btn => btn.textContent === 'Далее');
      expect(nextBtn3).toBeDefined();
      expect(nextBtn3).not.toBeDisabled();
    });
    const visibleButtons3c = screen.getAllByRole('button').filter(
      btn => !btn.className.includes('pointer-events-none')
    );
    const nextBtn3c = visibleButtons3c.find(btn => btn.textContent === 'Далее');
  fireEvent.click(nextBtn3c!);

    await waitFor(() => {
      // Появился шаг с рейтингом
      expect(screen.getByText(/Оцените ваш опыт использования веб-сайтов/i)).toBeInTheDocument();
    });
    // Step 4: Rating
    await waitFor(() => {
      expect(screen.getByText(/Оцените ваш опыт использования веб-сайтов/i)).toBeInTheDocument();
    });

    // Select the 4th star using test id
    const starBtn = screen.getAllByTestId('star')[3];
    expect(starBtn).toBeDefined();
    fireEvent.click(starBtn!);
    await waitFor(() => {
      const visibleButtons4b = screen.getAllByRole('button').filter(
        btn => !btn.className.includes('pointer-events-none')
      );
      const nextBtn4 = visibleButtons4b.find(btn => btn.textContent === 'Далее');
      expect(nextBtn4).toBeDefined();
      expect(nextBtn4).not.toBeDisabled();
    });
    const visibleButtons4c = screen.getAllByRole('button').filter(
      btn => !btn.className.includes('pointer-events-none')
    );
    const nextBtn4c = visibleButtons4c.find(btn => btn.textContent === 'Далее');
  fireEvent.click(nextBtn4c!);
    await waitFor(() => {
      expect(screen.getByText(/Опишите себя одним словом/i)).toBeInTheDocument();
    });

    // Step 5: Personality
    const personalitySelect = screen.getByRole('combobox');
    fireEvent.change(personalitySelect, { target: { value: 'Творческий' } });
    await waitFor(() => {
      expect(personalitySelect).toHaveValue('Творческий');
    });
    // Find and click the 'Завершить опрос' button on the last step
    const visibleButtonsFinal = screen.getAllByRole('button').filter(
      btn => !btn.className.includes('pointer-events-none')
    );
    const finishBtn = visibleButtonsFinal.find(btn => btn.textContent === 'Завершить опрос');
    expect(finishBtn).toBeDefined();
    await waitFor(() => {
      expect(finishBtn).not.toBeDisabled();
    });
    fireEvent.click(finishBtn!);

    await waitFor(() => {
      expect(screen.getByText(/Спасибо за участие/i)).toBeInTheDocument();
    });
  });
});
