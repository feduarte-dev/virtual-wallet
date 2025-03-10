import { useSelector, useDispatch } from 'react-redux';
import { GlobalStateType, ExpenseType, AppDispatch } from '../types';
import { deleteExpense, editExpense } from '../redux/actions';
import pencil from '../assets/pencil.svg';
import trash from '../assets/trash.svg';

function Table() {
  const expenses = useSelector((state: GlobalStateType) => state.wallet.expenses);
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (id: number) => {
    dispatch(editExpense(id));
  };

  return (
    <table className="table-container">
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
        {expenses.map(({ id, description, tag,
          method, value, currency, exchangeRates }: ExpenseType) => (
            <tr key={ id }>
              <td>
                {description}
              </td>
              <td>
                {tag}
              </td>
              <td>
                {method}
              </td>
              <td>
                {Number(value).toFixed(2)}
              </td>
              <td>
                {exchangeRates[currency].name}
              </td>
              <td>
                {Number(exchangeRates[currency].ask).toFixed(2)}
              </td>
              <td>
                {Number(exchangeRates[currency].ask * Number(value)).toFixed(2)}
              </td>
              <td>
                Real
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={ () => handleEdit(id) }
                  data-testid="edit-btn"
                >
                  <img src={ pencil } alt="edit-expense" />
                </button>
                <button
                  className="delete-btn"
                  onClick={ () => handleDelete(id) }
                  data-testid="delete-btn"
                >
                  <img src={ trash } alt="delete-expense" />
                </button>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
