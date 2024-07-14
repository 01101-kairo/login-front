'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const MetasUpdate = ({metaId}) => {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [dataMeta, setDataMeta] = useState('')
  const [userId, setUserId] = useState('')

  const [open, setOpen] = useState({
    open: false,
    mensage: '',
    severity: ''
  })

  useEffect(() => {
    const getmeta = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/metas/${ metaId}`, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        setDescricao(response.data.data.descricao)
        setValor(response.data.data.valor)
        setDataMeta(response.data.data.data)
        setUserId(response.data.data.user_id)
      } catch (error) {
        setOpen({
          open: true,
          mensage: error.response.data.message,
          severity: 'error'
        })
      }
    }

    getmeta()
  }, [metaId])

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const formattedDate = new Date(dataMeta).toISOString().slice(0, 19).replace('T', ' ');
      await axios.put(`http://localhost:8080/metas/${metaId}`, { descricao, valor, data: formattedDate, user_id: userId  },{
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })

      setOpen({
        open: true,
        mensage: `Meta ${descricao} atualizada com sucesso!`,
        severity: 'success'
      })
    } catch (error) {
      console.log(error)
      setOpen({
        open: true,
        mensage: error?.response?.data?.message,
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
        <h1>Atualizar meta</h1>

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

export default MetasUpdate
