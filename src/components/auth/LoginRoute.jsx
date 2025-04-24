import React from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./login/LoginModal";  

const LoginRoute = () => {
  const navigate = useNavigate();

  const handleSwitchToSignup = () => {
    navigate("/cadastro");
  };

  return <LoginModal onClose={() => navigate(-1)} onSwitchToSignup={handleSwitchToSignup} />;
};

export default LoginRoute;
