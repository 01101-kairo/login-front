'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import * as S from './style'

export const TransacoesCreate = () => {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('Receita')
  const [categoria, setCategoria] = useState({})
  const [dataTransacao, setDataTransacao] = useState('')
  const [categorias, setCategorias] = useState([])

  const [open, setOpen] = useState({
    open: false,
    mensage: '',
    severity: ''
  })

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8080/categorias/', {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        setCategorias(response.data.data)
      } catch (error) {
        setOpen({
          open: true,
          mensage: error.response.data.message,
          severity: 'error'
        })
      }
    }

    getCategorias()
  }, [])
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const formattedDate = new Date(dataTransacao).toISOString().slice(0, 19).replace('T', ' ');
      await axios.post('http://localhost:8080/transacoes', { descricao, valor, tipo, categoria_id: categoria, data: formattedDate },{
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })

      setOpen({
        open: true,
        mensage: `Transação ${descricao} criada com sucesso!`,
        severity: 'success'
      })
    } catch (error) {
      console.log(error)
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
        <h1>Criar transação</h1>

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

        <S.FormControl fullWidth>
          <S.InputLabel id="tipo">Tipo</S.InputLabel> 
          <S.Select
            labelId="tipo"
            name="tipo"
            id="tipo-select"
            value={ tipo }
            label="Tipo"
            onChange={(e) => setTipo(e.target.value)}
            variant="outlined"
          >
            <S.MenuItem value="Despesa">Despesa</S.MenuItem>
            <S.MenuItem value="Receita">Receita</S.MenuItem>
          </S.Select>
        </S.FormControl>

        <S.FormControl fullWidth>
          <S.InputLabel id="categoria">Categoria</S.InputLabel>
          <S.Select
            labelId="categoria"
            name="categoria"
            id="categoria-select"
            value={ categoria }
            label="Categoria"
            onChange={(e) => setCategoria(e.target.value)}
            variant="outlined"
          >
            { categorias.map(categoria =>
              <S.MenuItem
                key={ categoria.id }
                value={ categoria.id }>
                { categoria.nome }
              </S.MenuItem>
            )}
          </S.Select>
        </S.FormControl>

        <S.TextField
          name="data"
          onChange={(e) => setDataTransacao(e.target.value)}
          type='date'
          label="data"
          variant="outlined"
          value={ dataTransacao }
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

export default TransacoesCreate
