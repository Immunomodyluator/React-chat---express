import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Context } from '../../../index'
import { useNavigate } from 'react-router-dom'

const schema = yup
  .object({
    login: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .matches(/^[a-zA-Z\d]+$/, 'Incorrect login format'),
    email: yup
      .string()
      .required()
      .matches(/^[a-zA-Z\d]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Incorrect email format'),
    password: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .matches(/^[a-zA-Z\d]+$/, 'Incorrect password format'),
    passwordRepeat: yup
      .string()
      .required('Your passwords do not match')
      .oneOf([yup.ref('password')], 'Your passwords do not match')
  })
  .required()

const RegistrationForm = () => {
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
    const { login, email, password } = data
    store.registration(email, password, login).then((suc) => {
      navigate('/')
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' placeholder={'Login'} {...register('login')} />
        <p>{errors.login?.message}</p>

        <input type='email' placeholder={'Email'} {...register('email')} />
        <p>{errors.lmail?.message}</p>

        <input
          type='password'
          placeholder={'Password'}
          {...register('password')}
        />
        <p>{errors.password?.message}</p>

        <input
          type='password'
          placeholder={'Repeat password'}
          {...register('passwordRepeat')}
        />
        <p>{errors.passwordRepeat?.message}</p>

        <input type='Submit' />
      </form>
    </>
  )
}

export default RegistrationForm
