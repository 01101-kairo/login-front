'use client'

import { useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const CategoriasCreate = () => {
  const [nome, setNome] = useState('')

  const [open, setOpen] = useState({
    open: false,
    mensage: '',
    severity: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/categorias', { nome },{
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })

      setOpen({
        open: true,
        mensage: `Categoria ${nome} criada com sucesso!`,
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
        <h1>Criar categoria</h1>

        <S.TextField
          name="nome"
          onChange={(e) => setNome(e.target.value)}
          type='text'
          label="Categoria"
          variant="outlined"
          value={ nome }
        />

        <S.Button variant="contained" type="submit">Enviar</S.Button>
      </S.Form>
      <S.Snackbar open={ open.open } autoHideDuration={3000} onClose={handleClose }>
        <S.Alert onClose={handleClose }  variant='filled' severity={open.successp} >
          { open.mensage }
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default CategoriasCreate
