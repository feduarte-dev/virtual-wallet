import { useSelector } from 'react-redux';
import { GlobalStateType, ExpenseType } from '../types';

function Header() {
  const { email } = useSelector((state: GlobalStateType) => state.user);
  const { expenses } = useSelector((state: GlobalStateType) => state.wallet);

  const sumExpenses = () => {
    if (expenses.length > 0) {
      const sum = expenses.reduce((total, expense:ExpenseType) => {
        const currencyRate = Number(expense.exchangeRates[expense.currency].ask);
        total += (Number(expense.value) * currencyRate);
        return total;
      }, 0);

      return sum;
    }
    return 0;
  };

  return (
    <div>
      <h3 data-testid="email-field">{email}</h3>
      <h3 data-testid="total-field">{sumExpenses().toFixed(2)}</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
    </div>
  );
}

export default Header;
