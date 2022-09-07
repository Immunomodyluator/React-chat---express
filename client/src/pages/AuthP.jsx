import React, { useContext, useEffect, useState } from 'react';
import LoginForm from '../сomponents/auth/LoginForm/LoginForm';
import RegistrationForm from '../сomponents/auth/RegistrationForm/RegistrationForm';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';

export function AuthP() {
  const [isRegister, setIsRegister] = useState(false);
  const { store } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    store
      .checkAuth()
      .then((suc) => {
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let selectForm;
  if (isRegister) {
    selectForm = <RegistrationForm />;
  } else {
    selectForm = <LoginForm />;
  }

  return (
    <>
      <button onClick={() => store.logout()}>Выход</button>
      <button onClick={() => setIsRegister(true)}>Регистрация</button>
      <button onClick={() => setIsRegister(false)}>Вход</button>
      {selectForm}
    </>
  );
}

export default AuthP;
