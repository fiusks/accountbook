import { useEffect, useState } from "react";
import AuthContext from "./useContext";

function AuthProvider(props) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState();


  return (
    <AuthContext.Provider value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
