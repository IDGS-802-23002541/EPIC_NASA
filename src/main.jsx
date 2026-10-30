import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext'
import './index.css'

//Utiliza un sistema de enrutamiento basado en rutas anidadas, donde cada ruta puede tener rutas hijas. Esto permite una estructura jerárquica de rutas y facilita la organización de la navegación en la aplicación. (me gusta más esta)
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>
)

/*
Este es un sistema declarativo que utiliza los componentes Routes y Route para definir las rutas de la aplicación. Cada ruta se asocia con un componente que se renderiza cuando la ruta coincide con la URL actual.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
) */