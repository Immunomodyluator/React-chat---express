import React, { useContext, useState } from 'react'
import LoginForm from '../Components/auth/LoginForm/LoginForm'
import RegistrationForm from '../Components/auth/RegistrationForm/RegistrationForm'
import { Context } from '../index'

export function AuthP() {
  const [isRegister, setIsRegister] = useState(false)
  const { store } = useContext(Context)
  let selectForm
  if (isRegister) {
    selectForm = <RegistrationForm />
  } else {
    selectForm = <LoginForm />
  }

  return (
    <>
      <button onClick={() => store.logout()}>Выход</button>
      <button onClick={() => setIsRegister(true)}>Регистрация</button>
      <button onClick={() => setIsRegister(false)}>Вход</button>
      {selectForm}
    </>
  )
}

export default AuthP
