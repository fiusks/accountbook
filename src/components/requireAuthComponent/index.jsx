import Redirecting from "../redirectComponent";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

async function checkLogin(AuthToken) {
    try {

        const response = await fetch(`https://api-teste-equipe-6.herokuapp.com/checkLogin`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${AuthToken}`
            },

        });

        const data = await response.json();
        
        console.log(data);
        return data;

    } catch (error) {

    }
}


function RequireAuth({ children }) {
    const { token } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
        console.log(token)
         checkLogin(token);
      
    return isAuthenticated ? children : <Redirecting />;
}

export default RequireAuth;