import { UserType } from '../../types';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email: UserType) => ({
  type: SAVE_EMAIL,
  payload: email,
});
