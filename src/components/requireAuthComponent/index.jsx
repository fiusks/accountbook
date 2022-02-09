import Redirecting from "../redirectComponent";
import useUser from "../../hooks/useUser";
import { useState } from "react";

async function RequireAuth({children}){
    const {token} = useUser();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    
   try {

    const response = await fetch(`https://api-teste-equipe-6.herokuapp.com/checklogin`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` 
        },

      });

      const data = await response.json();
      console.log(data);


   } catch (error) {
       
   }

    
    return isAuthenticated ? children : <Redirecting />
} 

export default RequireAuth;