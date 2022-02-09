import Redirecting from "../redirectComponent";
import useAuth from "../../hooks/useAuth";



function RequireAuth({ children }) {
    const { token, isAuthenticated, setIsAuthenticated } = useAuth();
   
    try {

        fetch(`https://api-teste-equipe-6.herokuapp.com/checkLogin`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },

        }).then(async response => {
            const data = await response.json();
            if (data.validToken) {
                setIsAuthenticated(true);
                return 
            }
            setIsAuthenticated(false);
            return 
        });

    } catch (error) {

    }




    return isAuthenticated ? children : <Redirecting />;
}

export default RequireAuth;