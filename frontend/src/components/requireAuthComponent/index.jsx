import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function RequireAuth({ children }) {
  const { isAuthenticated, setIsAuthenticated, setUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function validateToken() {
      try {
        const token = document.cookie.split("=")[1];
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}validateToken`,
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
  
  return (
    isAuthenticated ? children :
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
    >
      <ClipLoader color='#DA0175' loading={true}
        css={
          `
          border: 3px solid;
          border-color: #DA0175;
          border-bottom-color: transparent;
        `}
        size={130}
        speedMultiplier={0.7} />
    </div>
  );
}

export default RequireAuth;
