import { useContext } from "react";
import AuthContext from "../contexts/useContext"

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
