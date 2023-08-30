import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type UserType = {
  email: string,
  password: string
};

export type GlobalStateType = {
  user: UserType,
  currencies: []
};

export type AppDispatch = ThunkDispatch<GlobalStateType, unknown, AnyAction>;
