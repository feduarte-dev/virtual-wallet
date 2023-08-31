import { AnyAction } from 'redux';
import { RECEIVE_CURRENCY, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const currencies = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case RECEIVE_CURRENCY:
      return {
        ...state,
        currencies: action.payload,
      };
    case SAVE_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    default:
      return state;
  }
};

export default currencies;
