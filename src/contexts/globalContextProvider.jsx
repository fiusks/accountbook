import { createContext } from "react";

function ContextoGlobal(props) {
const GlobalContext = createContext({});
    return (<GlobalContext.Provider value={props.value}>{props.children}</GlobalContext.Provider>);
}
export default ContextoGlobal
