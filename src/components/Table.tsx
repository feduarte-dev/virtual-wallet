import { useSelector } from 'react-redux';
import { GlobalStateType, ExpenseType } from '../types';

function Table() {
  const expenses = useSelector((state: GlobalStateType) => state.wallet.expenses);

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
              <button>Excluir</button>
              <button>Editar</button>
            </td>
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
