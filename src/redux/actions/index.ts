import { Dispatch } from 'redux';
import currencyAPI from '../../services/currencyAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';

export const saveEmail = (email: string) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const receiveCurrency = (currencies: string[]) => ({
  type: RECEIVE_CURRENCY,
  payload: currencies,
});

export const fetchCurrrencyAPI = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(receiveCurrency(Object.keys(await currencyAPI())
        .filter((teste) => teste !== 'USDT')));
    } catch (error) {
      console.log(error);
    }
  };
};
