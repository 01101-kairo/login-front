'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const CategoriasUpdate = ({categoriaId}) => {
  const [nome, setNome] = useState('')
  const [userId, setUserId] = useState('')

  const [open, setOpen] = useState({
    open: false,
    mensage: '',
    severity: ''
  })

  useEffect(() => {
    const getCategoria = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/categorias/${ categoriaId}`, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        console.log(response.data.data.nome)
        setUserId(response.data.data.user_id)
      } catch (error) {
        setOpen({
          open: true,
          mensage: error.response.data.message,
          severity: 'error'
        })
      }
    }

    getCategoria()
  }, [categoriaId])

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8080/categorias/${categoriaId}`, { nome, user_id: userId },{
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })

      setOpen({
        open: true,
        mensage: `Categoria ${nome} atualizada com sucesso!`,
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
    if (reason === 'clickaway'){
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
        <h1>Atualizar categoria</h1>

        <S.TextField
          name="nome"
          onChange={(e) => setNome(e.target.value)}
          type='text'
          label="Nome"
          variant="outlined"
          value={ nome }
        />

        <S.Button variant="contained" type="submit">Enviar</S.Button>
      </S.Form>
      <S.Snackbar open={ open.open } autoHideDuration={3000} onClose={handleClose }>
        <S.Alert onClose={handleClose }  variant='filled' severity={open.severity} >
          { open.mensage }
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default CategoriasUpdate
