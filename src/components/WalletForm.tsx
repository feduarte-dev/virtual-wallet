import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrrencyAPI } from '../redux/actions';
import { GlobalStateType, AppDispatch } from '../types';

function WalletForm() {
  const rootState = useSelector((state: GlobalStateType) => state.currencies);
  const dispatch: AppDispatch = useDispatch();

  const currencyArray = rootState.filter((filteredArr) => filteredArr !== 'USDT');

  useEffect(() => {
    dispatch(fetchCurrrencyAPI());
  }, []);

  return (
    <form>
      <label htmlFor="valor">
        {'Valor: '}
        <input data-testid="value-input" type="text" name="valor" />
      </label>
      <label htmlFor="descricao">
        {'Descrição: '}
        <input data-testid="description-input" type="text" name="descricao" />
      </label>
      <select data-testid="currency-input" name="moedas">
        {currencyArray.map((currency) => (
          <option
            key={ currency }
            value={ currency }
          >
            {currency}
          </option>))}
      </select>
      <select data-testid="method-input" name="metodo-de-pagamento">
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select data-testid="tag-input" name="categoria">
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button>Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
