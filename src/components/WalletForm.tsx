import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrrencyAPI, fetchExchangeRates, EditExpenseDone } from '../redux/actions';
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
  const [expensesValues, setExpensesValues] = useState<ExpenseType>(INITIAL_STATE);
  const [expenseID, setExpenseID] = useState<number>(0);

  const rootState = useSelector((state: GlobalStateType) => state);
  const ID = useSelector((state: GlobalStateType) => state.wallet.expenses.length);
  const { editor, currencies, editingExpenseId, expenses } = rootState.wallet;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrrencyAPI());
  }, [dispatch]);

  const handleExpenses = ({ target: { name, value } }
  :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const expenseInput = {
      ...expensesValues,
      [name]: value,
      id: expenseID,
    };
    setExpenseID(ID);
    setExpensesValues(expenseInput);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editor) {
      const updatedExpenses = expenses
        .map((expense: ExpenseType) => (expense.id === editingExpenseId
          ? {
            ...expense,
            ...expensesValues,
            id: editingExpenseId,
            exchangeRates: expense.exchangeRates,
          }
          : expense));
      dispatch(EditExpenseDone(updatedExpenses));
    } else {
      try {
        await dispatch(fetchExchangeRates(expensesValues));
        setExpensesValues(INITIAL_STATE);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="expenses-container" onSubmit={ (event) => handleSubmit(event) }>
      <label htmlFor="valor">
        {'Valor: '}
        <input
          onChange={ handleExpenses }
          value={ expensesValues.value }
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
          value={ expensesValues.description }
        />
      </label>
      <select
        data-testid="currency-input"
        name="currency"
        onChange={ handleExpenses }
        value={ expensesValues.currency }
      >
        {currencies.map((currency) => (
          <option
            key={ currency }
            value={ currency }
          >
            {currency}
          </option>))}
      </select>
      <select
        onChange={ handleExpenses }
        value={ expensesValues.method }
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
        value={ expensesValues.tag }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      {editor
        ? <button type="submit">Editar despesa</button>
        : <button className="add-expense" type="submit">Adicionar despesa</button>}
    </form>
  );
}

export default WalletForm;
