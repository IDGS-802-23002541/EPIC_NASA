# Proyecto NASA EPIC
 - Aideé Vanessa Casillas Tapia
 - IDGS1002 PWA
 - Entrega 2° Parcial

## Uso de herramientas de React

### 1. Context
Se utilizó `AuthContext` para administrar la autenticación del usuario, permitiendo realizar las acciones de inicio y cierre de sesión (`login` y `logout`).

### 2. useReducer
Se implementó en el componente `Epic` para administrar el estado de las fechas disponibles y la fecha seleccionada mediante las acciones `CARGAR_FECHAS` y `SELECCIONAR_FECHA`.

### 3. localStorage
Se utilizó para guardar la última fecha seleccionada por el usuario y recuperarla cuando vuelve a ingresar al componente.

### 4. useState
Se utilizó en el componente `Epic` para controlar los datos de las imágenes obtenidas de la API, los mensajes de error y el estado de carga.
Se utilizón en el componente `Formulario` para controlar los datos de usuario, contraseña y los mensajes de error

### 5. useEffect
Se utilizó para ejecutar las consultas iniciales a la API de NASA EPIC cuando se carga el componente.
