import {useState, useEfect} from 'react'
import Formulario from '../components/Formulario'

export default function Login(){
    return (
        <div>
            <h1> Bienvenido a EPIC </h1>
            <p> Valida tus credenciales para acceder </p>
            <Formulario />

            <h3>EPIC Daily “Blue Marble” API</h3>
            <p>La cámara de imágenes policromáticas de la Tierra (EPIC) es un instrumento a bordo del satélite Deep Space Climate Observatory (DSCOVR) que toma imágenes de la Tierra en 10 longitudes de onda diferentes, desde el ultravioleta hasta el infrarrojo cercano. EPIC proporciona datos valiosos sobre la atmósfera, los océanos y la superficie terrestre, lo que permite a los científicos estudiar el clima, la vegetación y otros fenómenos naturales.</p>
        </div>
    )
}