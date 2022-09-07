import React, { useState } from 'react'
import AuthController from '../../controllers/AuthController'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    AuthController.login(email, password)
      .then((success) => {
        setIsLogin(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!isLogin) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='email'
          />
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='password'
          />
          <button type='submit' />
        </form>
      </div>
    )
  } else {
    return <h1>Вы авторизованны</h1>
  }
}
