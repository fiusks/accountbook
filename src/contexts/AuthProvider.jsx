import AuthContext from "./useContext";

function AuthProvider(props) {
    return (<AuthContext.Provider value={props.value}>{props.children}</AuthContext.Provider>);
}
export default AuthProvider;
