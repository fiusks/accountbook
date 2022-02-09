import { useState } from "react";

function useAuthProvider () {
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return {
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated
    }
}

export default useAuthProvider;