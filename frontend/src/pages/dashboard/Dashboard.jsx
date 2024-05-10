import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Header } from "../../components";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box className="flex justify-between align-center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
