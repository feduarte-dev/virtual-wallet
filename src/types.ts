import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type UserType = {
  email: string,
  password: string
};

export type GlobalStateType = {
  user: UserType,
  wallet: {
    currencies: []
    expenses: []
  }
  expenses:[]
};

export type ExpenseType = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: any,
};

export type AppDispatch = ThunkDispatch<GlobalStateType, unknown, AnyAction>;
