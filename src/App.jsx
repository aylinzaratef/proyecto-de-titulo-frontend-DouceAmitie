import { Routes, Route } from 'react-router-dom' //SE IMPORTAN ROUTES Y ROUTER
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'      //SE IMPORTA EL JSX DE DASHBOARD UBICADO EN LA CARPETA PAGES
import { Stadistic } from './pages/Stadistic'    //SE IMPORTA EL JSX DE DASHBOARD UBICADO EN LA CARPETA PAGES
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Book } from './pages/Book'
import { Employees } from './pages/Employees'
import { Box } from './pages/Box'
import { Landing } from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route exact path='/calendar' element={<Home />} />
      <Route exact path='/statistics' element={<Stadistic />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/book' element={<Book />} />
      <Route exact path='/employees' element={<Employees />} />
      <Route exact path='/box' element={<Box />} />
      <Route exact path='/' element={<Landing />} />
    </Routes>                                           //GENERA RUTAS PARA LAS PAGINAS

  )
}

export default App

