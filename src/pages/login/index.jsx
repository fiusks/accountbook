import {useContext} from 'react';
import AuthContext from '../../contexts/useContext'
function Login() {
const value = useContext(AuthContext);

    return (
        <div className="login">
            <h1>{value.msg}</h1>
        </div>
    );
}

export default Login;