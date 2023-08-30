import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEmail } from '../redux/actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const [login, setLogin] = useState(INITIAL_STATE);
  const [disableBtn, setDisableBtn] = useState(true);
  const { email, password } = login;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = ({ target: { name, value } }:any) => {
    const loginData = {
      ...login,
      [name]: value,
    };
    setLogin(loginData);

    if (password.length > 4 && email.match(/^\S+@\S+\.\S+$/)) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(saveEmail(email));
    navigate('/carteira');
  };

  return (
    <form onSubmit={ (event) => handleSubmit(event) }>
      <label htmlFor="email">
        {'Email: '}
        <input
          value={ email }
          onChange={ handleLogin }
          type="email"
          name="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
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
        type="submit"
        disabled={ disableBtn }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
