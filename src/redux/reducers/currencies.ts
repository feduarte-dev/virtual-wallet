import { AnyAction } from 'redux';
import { RECEIVE_CURRENCY } from '../actions';

const INITIAL_STATE: string[] = [];

const currencies = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case RECEIVE_CURRENCY:
      return action.payload;
    default:
      return state;
  }
};

export default currencies;
