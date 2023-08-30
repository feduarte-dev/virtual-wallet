import { useSelector } from 'react-redux';
import { GlobalStateType } from '../types';

function Header() {
  const { email } = useSelector((state: GlobalStateType) => state.user);

  return (
    <div>
      <h3 data-testid="email-field">{email}</h3>
      <h3 data-testid="total-field">0</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
    </div>
  );
}

export default Header;
