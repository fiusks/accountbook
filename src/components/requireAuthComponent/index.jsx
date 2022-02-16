import Redirecting from "../redirectComponent";
import useAuth from "../../hooks/useAuth";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Redirecting />;
}

export default RequireAuth;
