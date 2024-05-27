import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

const GoogleLogin = () => {
  const { login } = useAuth();
  const location = useLocation();

  const getAccessTokenFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("isLogged", "true");
      login(accessToken);
    }

    return accessToken;
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = "http://localhost:5000/api/googleLogin";
    window.open(googleAuthUrl, "_self");
  };

  getAccessTokenFromQuery();

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>
    </>
  );
};

export default GoogleLogin;
