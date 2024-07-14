'use client'

import { useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const MetasCreate = () => {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [dataMeta, setDataMeta] = useState('')

  const [open, setOpen] = useState({
    open: false,
    mensage: '',
    severity: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const formattedDate = new Date(dataMeta).toISOString().slice(0, 19).replace('T', ' ');
      await axios.post('http://localhost:8080/metas', { descricao, valor, data: formattedDate },{
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })

      setOpen({
        open: true,
        mensage: `Meta ${descricao} criada com sucesso!`,
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
        <h1>Criar meta</h1>

        <S.TextField
          name="descricao"
          onChange={(e) => setDescricao(e.target.value)}
          type='text'
          label="Descrição"
          variant="outlined"
          value={ descricao }
        />

        <S.TextField
          name="valor"
          onChange={(e) => setValor(e.target.value)}
          type='number'
          label="Valor"
          variant="outlined"
          value={ valor }
        />

        <S.TextField
          name="data"
          onChange={(e) => setDataMeta(e.target.value)}
          type='date'
          label="data"
          variant="outlined"
          value={ dataMeta }
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

export default MetasCreate
