import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrrencyAPI, fetchExchangeRates } from '../redux/actions';
import { GlobalStateType, AppDispatch, ExpenseType } from '../types';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

function WalletForm() {
  const [expenses, setExpenses] = useState<ExpenseType>(INITIAL_STATE);
  const [expenseID, setExpenseID] = useState<number>(0);

  const rootState = useSelector((state: GlobalStateType) => state);
  const ID = useSelector((state: GlobalStateType) => state.wallet.expenses.length);

  const currencyArray = rootState.wallet.currencies;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrrencyAPI());
  }, [dispatch]);

  const handleExpenses = ({ target: { name, value } }
  :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const expenseInput = {
      ...expenses,
      [name]: value,
      id: expenseID,
    };
    setExpenseID(ID);
    setExpenses(expenseInput);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchExchangeRates(expenses));
    setExpenses(INITIAL_STATE);
  };

  return (
    <form onSubmit={ (event) => handleSubmit(event) }>
      <label htmlFor="valor">
        {'Valor: '}
        <input
          onChange={ handleExpenses }
          value={ expenses.value }
          name="value"
          data-testid="value-input"
          type="text"
        />
      </label>
      <label htmlFor="descricao">
        {'Descrição: '}
        <input
          data-testid="description-input"
          type="text"
          name="description"
          onChange={ handleExpenses }
          value={ expenses.description }
        />
      </label>
      <select
        data-testid="currency-input"
        name="currency"
        onChange={ handleExpenses }
        value={ expenses.currency }
      >
        {currencyArray.map((currency) => (
          <option
            key={ currency }
            value={ currency }
          >
            {currency}
          </option>))}
      </select>
      <select
        onChange={ handleExpenses }
        value={ expenses.method }
        data-testid="method-input"
        name="method"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select
        data-testid="tag-input"
        name="tag"
        onChange={ handleExpenses }
        value={ expenses.tag }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button
        type="submit"
      >
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
