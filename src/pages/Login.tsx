import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEmail } from '../redux/actions';
import { UserType } from '../types';
import './login.css';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const [login, setLogin] = useState<UserType>(INITIAL_STATE);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const { email, password } = login;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = ({ target: { name, value } }
  :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const loginData = {
      ...login,
      [name]: value,
    };
    setLogin(loginData);
    return password.length > 4 && email.match(/^\S+@\S+\.\S+$/)
      ? setDisableBtn(false) : setDisableBtn(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(saveEmail(email));
    navigate('/carteira');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={ (event) => handleSubmit(event) }>
        <label className="email-label" htmlFor="email">
          {'Email: '}
          <input
            value={ email }
            onChange={ handleLogin }
            type="email"
            name="email"
            data-testid="email-input"
          />
        </label>
        <label className="password-label" htmlFor="password">
          {'Senha: '}
          <input
            value={ password }
            onChange={ handleLogin }
            type="password"
            name="password"
            data-testid="password-input"
          />
        </label>
        <button
          className="login-button"
          type="submit"
          disabled={ disableBtn }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
