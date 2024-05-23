import React from "react";
import { Box, Button } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent={{ xs: "space-between" }}
        p={2}
        position="fixed"
        top="0"
        right="0"
        bgcolor="transparent"
        opacity="1"
        sx={{
          backgroundImage:
            "linear-gradient(0deg, rgba(1, 10, 19, 0) 0%, rgba(1, 10, 19, 0.13) 15%, rgba(1, 10, 19, 0.2) 22%, rgba(1, 10, 19, 0.28) 28%, rgba(1, 10, 19, 0.33) 33%, rgba(1, 10, 19, 0.37) 37%, rgba(1, 10, 19, 0.42) 42%, rgba(1, 10, 19, 0.46) 46%, rgba(1, 10, 19, 0.5) 50%, rgba(1, 10, 19, 0.54) 54%, rgba(1, 10, 19, 0.58) 58%, rgba(1, 10, 19, 0.63) 63%, rgba(1, 10, 19, 0.67) 67%, rgba(1, 10, 19, 0.72) 72%, rgba(1, 10, 19, 0.78) 78%, rgba(1, 10, 19, 0.85) 85%, rgb(1, 10, 19) 100%)",
          boxShadow: "none",
        }}
      >
        <Box className="mx-20">
          <img
            src="https://github.com/CodeKaito/Wallet/blob/main/frontend/src/assets/logo.jpg?raw=true"
            width={50}
          />
        </Box>
        {/* Icons */}
        <Box className="flex justify-end gap-2 mx-20">
          <Button size="small" variant="contained">
            Login
          </Button>
          <Button size="small" variant="outlined" className="mx-10">
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
