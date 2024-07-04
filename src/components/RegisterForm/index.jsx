'use client'

import * as S from './style'

const RegisterForm = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado')
  }

  return (
    <form onClick={ onSubmit }>
      <h1>Formulário de registro</h1>

      <S.TextField id="name" label="Nome" variant="outlined" />
      <S.TextField id="email" label="E-mail" variant="outlined" />
      <S.TextField id="password" label="Password" variant="outlined" />

      <S.Button variant="contained"type="submit">Enviar</S.Button>
    </form>
  )
}

export default RegisterForm
