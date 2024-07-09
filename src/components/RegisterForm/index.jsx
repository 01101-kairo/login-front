'use client'

import { useState } from 'react'
import axios from 'axios'
import * as S from './style'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [open, setOpen] = useState({
    open: false,
    mensage: '',
    severity: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {name, email, password })
      console.log('response', response)
      localStorage.setItem('token', response.data.data)
      setOpen({
        open: true,
        mensage: `Usuario ${ email } cadastrado com sucesso!`,
        severity: 'success'
      })
    } catch (error) {
      setOpen({
        open: true,
        mensage: error.response.data.error,
        severity: 'error'
      })
    }
  }

  const handleClose = (_, reason) => {
    if (reason === 'clicckaway'){
      return
    }
    setOpen({
      open: false,
      mensage: '',
      severity: ''
    })
  }

  return (
    <>
      <S.Form onSubmit={ onSubmit }>
        <h1>Cadastre-se</h1>

        <S.TextField
          name="name"
          onChange={ (e) => setName(e.target.value) }
          type='text'
          label="Nome"
          variant="outlined"
          value={ name }
        />

        <S.TextField
          name="email"
          onChange={  (e) => setEmail(e.target.value)}
          type='email'
          label="E-mail"
          variant="outlined"
          value={ email }
        />

        <S.TextField
          name="password" 
          onChange={ (e) => setPassword(e.target.value)}
          type='password'
          label="Password"
          variant="outlined"
          value={ password }
        />

        <S.Button variant="contained" type="submit">Enviar</S.Button>
      </S.Form>
      <S.Snackbar open={ open } autoHideDuration={3000} onClose={ handleClose }>
        <S.Alert onClose={ handleClose }  variant='filled' severity='success' >
          { open.mensage }
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default RegisterForm
