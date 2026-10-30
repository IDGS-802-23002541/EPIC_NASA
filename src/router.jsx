import { createBrowserRouter, Outlet, Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Login from "./pages/Login";
import Epic from "./pages/Epic";
import { useNavigate } from "react-router-dom";
import {useAuth} from "./auth/AuthContext";
import NotFound from "./pages/NotFound";
import RutaProtegida from "./auth/RutaProtegida";

function Layout(){
    const {autenticado, logout} = useAuth()
    const navigate = useNavigate();

    const handleNavigate = () => {
        if(autenticado){
            logout()
            navigate('/')
        }
    }

    return (
        <>
            {/* Renderiza el componente Outlet, que representa el contenido de la ruta hija correspondiente a la ruta actual */}
            <Outlet />
            {autenticado && (
                <Box sx={{ display: "flex", gap: 2, p: 2 }}>
                <Button className="" onClick={handleNavigate} variant="contained">
                    Cerrar sesión
                </Button>
            </Box>
            )}
        </>
    );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Login />,
        },
        {
            element: <RutaProtegida />,
            children: [
                {
                    path: "/epic",
                element: <Epic />,
                }
            ]
        }
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;