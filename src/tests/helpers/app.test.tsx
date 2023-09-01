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

describe('Testando WalletForm', () => {
  test('Verifica funcionalidade de adicionar e remover despesas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    await userEvent.type(valueInput, '10');
    await userEvent.type(descriptionInput, 'Coxinha');
    await userEvent.click(addBtn);
    const delBtn = screen.getByRole('button', {
      name: /excluir/i,
    });
    await waitFor(() => {
      expect(delBtn).toBeInTheDocument();
    });
    await userEvent.click(delBtn);
    await waitFor(() => {
      expect(delBtn).not.toBeInTheDocument();
    });
  });

  test('Verifica funcionalidade de editar despesas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    await userEvent.type(valueInput, '10');
    await userEvent.type(descriptionInput, 'Coxinha');
    await userEvent.click(addBtn);
    const editBtn = screen.getByTestId('edit-btn');
    await waitFor(() => {
      expect(editBtn).toBeInTheDocument();
    });
    await userEvent.click(editBtn);
    await userEvent.type(valueInput, '20');
    await userEvent.type(descriptionInput, 'Cachorro Quente');
    const finishEdit = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    await userEvent.click(finishEdit);
    const newValue = screen.getByRole('cell', {
      name: /20\.00/i,
    });
    await waitFor(() => {
      expect(newValue).toBeInTheDocument();
    });
  });
});
