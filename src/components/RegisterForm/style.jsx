import styled from '@emotion/styled'
import ButtonMUI from '@mui/material/Button'
import TextFieldMUI from '@mui/material/TextField'
import AlertMUI from '@mui/material/Alert'
import SnackbarMUI from '@mui/material/Snackbar'
import TypographyMUI from '@mui/material/Typography'
import LinkNext from 'next/link'

import FormControlMUI from '@mui/material/FormControl'
import InputLabelMUI from '@mui/material/InputLabel'
import OutlinedInputMUI from '@mui/material/OutlinedInput'
import InputAdornmentMUI from '@mui/material/InputAdornment'
import IconButtonMUI from '@mui/material/IconButton'
import VisibilityOffMUI from '@mui/icons-material/VisibilityOff'
import VisibilityMUI from '@mui/icons-material/Visibility'


export const Button = styled( ButtonMUI )`
    margin-bottom: 40px;
`

export const TextField = styled( TextFieldMUI )`
    margin-bottom: 64px;
`

export const Alert = styled( AlertMUI )``
export const Snackbar = styled( SnackbarMUI )``
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-width: 400px;
`

export const Typography = styled( TypographyMUI )`
    margin-bottom: 64px;
`

export const Link = styled(LinkNext)`
    color: ${({ theme }) => theme.palette.primary.main };
    text-decoration: none;
`

export const FormControl = styled( FormControlMUI )``
export const InputLabel = styled( InputLabelMUI )``
export const OutlinedInput = styled( OutlinedInputMUI )``
export const InputAdornment = styled( InputAdornmentMUI )``
export const IconButton = styled( IconButtonMUI )``
export const VisibilityOff = styled( VisibilityOffMUI )``
export const Visibility = styled( VisibilityMUI )``
