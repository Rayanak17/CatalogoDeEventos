import React from "react";
import { useNavigate } from "react-router-dom";
import SignupModal from "./signup/SignupModal";  

const SignupRoute = () => {
  const navigate = useNavigate();

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return <SignupModal onClose={() => navigate(-1)} onSwitchToLogin={handleSwitchToLogin} />;
};

export default SignupRoute;
