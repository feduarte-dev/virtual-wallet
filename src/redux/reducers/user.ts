import { AnyAction } from 'redux';
import { UserType } from '../../types';
import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE: UserType = {
  email: '',

};

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SAVE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default user;
