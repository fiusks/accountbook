import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function validateToken() {
      try {
        const token = document.cookie.split("=")[1];
        const response = await fetch(
          `https://api-testes-equipe-06.herokuapp.com/validateToken`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!data.success) {
          setIsAuthenticated(false);
          navigate("/login");
          return;
        }

        setIsAuthenticated(true);
        setUserData({
          id: data.success.id,
          name: data.success.name,
          email: data.success.email,
          cpf: data.success.cpf,
          phone: data.success.phone,
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    validateToken();
  }, []);

  return isAuthenticated ? children : <h1>Carregando...</h1>;
}

export default RequireAuth;
