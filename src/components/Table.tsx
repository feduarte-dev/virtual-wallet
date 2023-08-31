import { useSelector, useDispatch } from 'react-redux';
import { GlobalStateType, ExpenseType, AppDispatch } from '../types';
import { deleteExpense } from '../redux/actions';

function Table() {
  const expenses = useSelector((state: GlobalStateType) => state.wallet.expenses);
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = (id: any) => {
    dispatch(deleteExpense(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense: ExpenseType) => (
          <tr key={ expense.id }>
            <td>
              {expense.description}
            </td>
            <td>
              {expense.tag}
            </td>
            <td>
              {expense.method}
            </td>
            <td>
              {Number(expense.value).toFixed(2)}
            </td>
            <td>
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask * Number(expense.value))
                .toFixed(2)}
            </td>
            <td>
              Real
            </td>
            <td>
              <button>Editar</button>
              <button
                onClick={ () => handleDelete(expense.id) }
                data-testid="delete-btn"
              >
                Excluir

              </button>
            </td>
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
