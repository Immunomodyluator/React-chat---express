import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './App.css'

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required()
  })
  .required()

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) => console.log(data)
  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} />
        <p>{errors.firstName?.message}</p>

        <input {...register('age')} />
        <p>{errors.age?.message}</p>

        <input type='submit' />
      </form>
    </div>
  )
}

export default App
