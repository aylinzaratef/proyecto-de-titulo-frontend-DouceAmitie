import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './scss/styles.scss'


ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <App/>
 </BrowserRouter>
)



//RENDERIZA LO QUE EN EL ARCHIVO APP.JSX SE IMPORTA A TRAVES DE LAS RUTAS  