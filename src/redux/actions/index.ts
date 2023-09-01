import { Dispatch } from 'redux';
import { currencyAPI } from '../../services/currencyAPI';
import { ExpenseType } from '../../types';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_EXPENSE_DONE = 'EDIT_EXPENSE_DONE';

export const saveEmail = (email: string) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const receiveCurrency = (currencies: string[]) => ({
  type: RECEIVE_CURRENCY,
  payload: currencies,
});

export const saveExpenses = (expenses: ExpenseType[]) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
});

export const fetchCurrrencyAPI = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(receiveCurrency(Object.keys(await currencyAPI())
        .filter((filteredArr) => filteredArr !== 'USDT')));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteExpense = (id: number) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const fetchExchangeRates = (expenses: ExpenseType[] | any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(saveExpenses({ ...expenses, exchangeRates: await currencyAPI() }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editExpense = (id: number) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const EditExpenseDone = (editedExpenses: ExpenseType[]) => ({
  type: EDIT_EXPENSE_DONE,
  payload: editedExpenses,
});
