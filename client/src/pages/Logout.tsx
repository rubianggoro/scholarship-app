import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("user_email");
    navigate("/login");
  }, []);

  return <div />;
};

export default Logout;
