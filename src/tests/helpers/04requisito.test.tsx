import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import mockData from './mockData';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import * as APIModule from '../../services/currencyAPI';

beforeEach(() => {
  vi.spyOn(APIModule, 'currencyAPI').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Testando Home', () => {
  test('Verifica se ao digitar as informações corretas e clicar no botão a página navega até a carteira', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button');
    await userEvent.type(emailInput, 'tryber@trybe.com');
    await userEvent.type(passwordInput, 'tryber');
    await userEvent.click(button);
    const currencyField = screen.getByTestId('header-currency-field');
    await waitFor(() => {
      expect(currencyField).toBeInTheDocument();
    });
  });
});
