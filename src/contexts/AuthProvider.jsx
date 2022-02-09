import AuthContext from "./useContext";
import useAuthProvider from "../hooks/useAuthProvider";


function AuthProvider(props) {
  const authProvider = useAuthProvider();
  return (
    <AuthContext.Provider value={authProvider}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
