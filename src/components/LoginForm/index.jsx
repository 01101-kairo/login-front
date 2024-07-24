'use client'

import { useState } from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios'
import * as S from '../RegisterForm/style'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setshowPassword] = useState(false)

  const [open, setOpen] = useState({
    open: false,
    mensage: '',
    severity: ''
  })

  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password })

      localStorage.setItem('token', response.data.data)
      setOpen({
        open: true,
        mensage: `Usuário ${email} autenticado com sucesso!`,
        severity: 'success'
      })

      router.push('/dashboard')
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

  const handleClickShowPassword = () =>  setshowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <S.Form onSubmit={ onSubmit }>
        <S.Typography variant='h1' color="primary">YOURfinace.IO</S.Typography>

        <S.TextField
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          label="E-mail"
          variant="outlined"
          value={ email }
          fullWidth
        />

        <S.FormControl fullWidth variant="outlined">
          <S.InputLabel htmlFor="outlined-adornment-password">Password</S.InputLabel>
          <S.OutlinedInput
            id="outlined-adornment-password"
            name="password"
            onChange={ (e) => setPassword(e.target.value)}
            variant="outlined"
            value={ password }
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <S.InputAdornment position="end">
                <S.IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <S.VisibilityOff /> : <S.Visibility />}

                </S.IconButton>
              </S.InputAdornment>
            }
            label="Password"
          />
        </S.FormControl>

        <S.Button variant="contained" type="submit" fullWidth>Enviar</S.Button>

        <S.Link href="/register">Criar uma conta</S.Link>
      </S.Form>
      <S.Snackbar open={ open.open } autoHideDuration={3000} onClose={handleClose }>
        <S.Alert onClose={handleClose }  variant='filled' severity={open.successp} >
          { open.mensage }
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default LoginForm
