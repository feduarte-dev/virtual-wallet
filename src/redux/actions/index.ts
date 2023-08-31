import { Dispatch } from 'redux';
import { currencyAPI } from '../../services/currencyAPI';
import { ExpenseType } from '../../types';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

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

export const fetchExchangeRates = (expenses: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(saveExpenses({ ...expenses, exchangeRates: await currencyAPI() }));
    } catch (error) {
      console.log(error);
    }
  };
};
