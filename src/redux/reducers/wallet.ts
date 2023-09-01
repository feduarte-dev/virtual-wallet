import { AnyAction } from 'redux';
import { RECEIVE_CURRENCY, SAVE_EXPENSES,
  DELETE_EXPENSE, EDIT_EXPENSE, EDIT_EXPENSE_DONE } from '../actions';
import { ExpenseType } from '../../types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editingExpenseId: null,
  editor: false,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
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
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses
          .filter((expense:ExpenseType) => expense.id !== action.payload),
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        editor: true,
        editingExpenseId: action.payload,
      };
    case EDIT_EXPENSE_DONE:
      return {
        ...state,
        editor: false,
        expenses: action.payload,
      };
    default:
      return state;
  }
};

export default wallet;
