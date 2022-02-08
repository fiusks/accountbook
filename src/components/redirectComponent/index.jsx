import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirecting() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      navigate("/login");
    };
    redirect();
  }, [navigate]);

  return (
    <div className="error">
      <h1>error 404!</h1>
    </div>
  );
}

export default Redirecting;
