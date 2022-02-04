import { Routes, Route } from 'react-router-dom';
import ContextoGlobal from './contexts/globalContextProvider';
import Login from './pages/login';
import Home from './pages/home';
import LogOut from './pages/logout';
 
function Rotas() {
    return (
        <ContextoGlobal>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/logout' element={<LogOut/>} />
            </Routes>
        </ContextoGlobal>)
}

export default Rotas;