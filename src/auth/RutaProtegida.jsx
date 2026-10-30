import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

// Exige sesión iniciada.
export default function RutaProtegida() {
  const { autenticado } = useAuth()

  if (!autenticado) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
