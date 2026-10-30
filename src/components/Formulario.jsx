import { useState } from 'react'
import { usuarios } from '../data/usuarios'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../auth/AuthContext'
import { Alert, Box, TextField, Button } from '@mui/material'

export default function Formulario(){
    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        if(!usuario || !contrasenia){
            return setError('Por favor ingresa tu usuario y contraseña')
        }

        const usuarioValido = usuarios.find((u) => usuario === u.usuario && contrasenia === u.contrasenia)

        if(!usuarioValido){
            return setError('Usuario o contraseña incorrectos')
        }
        login(usuarioValido)
        navigate('/epic')
    }

    return (
        <>
        <form onSubmit={handleLogin}>

            <Box
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            >
                <TextField
                    id="outlined-user-input"
                    label="Usuario"
                    type="text"
                    autoComplete="current-text"
                    value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='Usuario'
                />

                <TextField
                    id="outlined-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} placeholder='Contraseña'
                />
            
            </Box>
            {error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}
            <Button variant="contained" color="success" type='submit' size='medium' sx={{ m: 1, width: '25ch' }}>
                Iniciar Sesión
            </Button>
        </form>
        </>
    )
}