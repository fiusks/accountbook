import { Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import Home from './pages/home';
import Login from './pages/login';
import LogOut from './pages/logout';
 
function Rotas() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/logout' element={<LogOut/>} />
            </Routes>
        </AuthProvider>)
}

export default Rotas;