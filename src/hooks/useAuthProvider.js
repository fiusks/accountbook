import { useState } from "react";

function useAuthProvider() {
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        cpf: "",
        phone: "",
    });


    return {
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData
    }

}

export default useAuthProvider;