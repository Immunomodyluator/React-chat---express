import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Context } from '../../../index'
import { useNavigate } from 'react-router-dom'

const schema = yup
  .object({
    email: yup
      .string()
      .required()
      .matches(/^[a-zA-Z\d]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Incorrect email format'),
    password: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .matches(/^[a-zA-Z\d]+$/, 'Incorrect password format')
  })
  .required()

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  let navigate = useNavigate()

  const { store } = useContext(Context)

  function onSubmit(data) {
    const { email, password } = data
    store
      .login(email, password)
      .then((suc) => {
        navigate('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder={'Email'} {...register('email')} />
      <p>{errors.email?.message}</p>

      <input placeholder={'Password'} {...register('password')} />
      <p>{errors.password?.message}</p>

      <input type='Submit' />
    </form>
  )
}

export default LoginForm
