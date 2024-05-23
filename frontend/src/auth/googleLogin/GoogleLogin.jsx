import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    const googleAuthUrl = "https://epicode-api.onrender.com/api/googleLogin";
    window.open(googleAuthUrl, "_self");
  };
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
