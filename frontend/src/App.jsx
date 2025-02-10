
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path = "login" element={<Login/>} />
        <Route path = "signup" element={<Signup/>} />
      </Routes>
      <ToastContainer position='top-center' autoClose='3000' />    
    </BrowserRouter>
  )
}

export default App
