import { Box, Grid, Card, CardContent, CardMedia, Alert, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import {useState, useEffect, useReducer} from 'react'

const estadoInicial = {
    fechas: [],
    fechaSeleccionada: ''
};

function epicReducer(state, action) {
    switch (action.type) {
        case 'CARGAR_FECHAS':
            return { ...state, fechas: action.payload };
        case 'SELECCIONAR_FECHA':
            return { ...state, fechaSeleccionada: action.payload };
        default:
            return state;
    }
}

export default function Epic(){
    const [error, setError] = useState(null)
    const API_URL = 'https://epic.gsfc.nasa.gov/api'
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(epicReducer, estadoInicial);
    const {fechas, fechaSeleccionada} = state;

    const getDates = async () => {
        try{
            setLoading(true)
            const response = await fetch(`${API_URL}/cloud/available`)
            if(!response.ok){
                throw new Error('No charchó :c checa bien')
            }
            const fechas = await response.json()
            //console.log(fechas)
            dispatch({
                type: 'CARGAR_FECHAS',
                payload: fechas
            });
        }catch(err){
            setError(err.message)
        }finally {
            setLoading(false);
        }
    }

    const getData = async (fecha) => {
        try{
            setLoading(true)
            const filtro = fecha ? `cloud/date/${fecha}` : `cloud`;
            const response = await fetch(`${API_URL}/${filtro}`)
            if(!response.ok){
                throw new Error('No charchó :c checa bien')
            }
            const data = await response.json()
            //console.log(data)
            const imagenesOrdenadas = [...data].sort(
                (a,b) => new Date(a.date) - new Date(b.date)
            )
            setData(imagenesOrdenadas)
        }catch(err){
            setError(err.message)
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDates();
        const fechaGuardada = localStorage.getItem('fechaSeleccionada');
        if (fechaGuardada) {
            dispatch({
                type: 'SELECCIONAR_FECHA',
                payload: fechaGuardada
            });
            getData(fechaGuardada);
        } else {
            getData();
        }
    }, [])

    const getImageUrl = (imagen) => {
        const [year, month, day] = imagen.date.slice(0, 10).split("-");
        return `https://epic.gsfc.nasa.gov/archive/cloud/${year}/${month}/${day}/png/${imagen.image}.png`;
    };

    return (
        <>
        <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="fecha-label">Seleccionar fecha</InputLabel>

            <Select
                id="fecha-label"
                value={fechaSeleccionada}
                label="Seleccionar fecha"
                onChange={(e) => {
                    const fecha = e.target.value;
                    dispatch({
                        type: 'SELECCIONAR_FECHA',
                        payload: fecha
                    });
                    localStorage.setItem('fechaSeleccionada', fecha);
                    getData(fecha);
                }}
            >
                {fechas.map((fecha) => (
                    <MenuItem key={fecha} value={fecha}>
                        {fecha}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        {/*Aquí se pintan las imágnes con su info */}
        <Box>
            <Grid container spacing={5}>
                {data.length > 0 ? (
                    data.map((d) => (
                        <Card sx={{ maxWidth: 345 }} key={d.identifier}>
                            <CardMedia
                                sx={{ height: 300 }}
                                image={getImageUrl(d)}
                                title={d.identifier}
                            />
                            <CardContent>
                                <Typography variant="h5">{d.date}</Typography>
                                <p>{d.caption}</p>
                            </CardContent>  
                            </Card>
                    ))
                ) : (
                    <>
                    {loading && <p>Cargando...</p>}
                    </>
                )}
                {
                    error && <Alert severity='error'>{error}</Alert>
                }
                
            </Grid>
        </Box>
        </>
    )
}