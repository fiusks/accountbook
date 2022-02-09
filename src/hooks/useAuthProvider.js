import { useState } from "react";

function useAuthProvider () {
    const [token, setToken] = useState('');


    return {
        token,
        setToken
    }
}

export default useAuthProvider;