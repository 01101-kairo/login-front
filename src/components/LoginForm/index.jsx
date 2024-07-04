'use client'

import { useState } from 'react'
import axios from 'axios'
import * as S from '../RegisterForm/style'

const LoginForm = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const onChangeValue = (e) => {
    const {name, value} = e.target
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {email, password})
      localStorage.setItem('token', response.data.data.token)
    }
    catch (error) {
      console.log('error', error)
    }
  }

  return (
    <form onClick={ onSubmit }>
      <h1>Formulário de Login</h1>
      <S.TextField name="email" onChange={ onChangeValue } type='email' label="E-mail" variant="outlined" />
      <S.TextField name="password" onChange={ onChangeValue } type='password' label="Password" variant="outlined" />

      <S.Button variant="contained" type="submit">Enviar</S.Button>
    </form>
  )
}

export default LoginForm
