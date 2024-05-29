import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {
  LogoutRoundedIcon,
  SearchIcon,
  AddIcon,
  SavingsRoundedIcon,
} from "../../icons";

const TopBar = ({ openPaymentModal, openSavingsModal }) => {
  const { logout } = useAuth();
  const defaultAvatarUrl =
    "https://res.cloudinary.com/dkj3atfao/image/upload/v1716812728/users/x2gbjdreqfspgokuevtd.jpg";
  return (
    <>
      <Box
        display="flex"
        justifyContent={{ xs: "space-between" }}
        p={2}
        className="lg:sticky lg:top-0 bg-white"
      >
        <Box className="hidden sm:flex bg-gray-100 rounded-lg z-999">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box className="xs:block sm:hidden">
          <IconButton>
            <img
              alt="profile-user"
              src={defaultAvatarUrl}
              className="pointer rounded-full"
              width={50}
              height={50}
            />
          </IconButton>
        </Box>

        {/* Icons */}
        <Box className="hidden md:flex">
          <IconButton onClick={openPaymentModal}>
            <AddIcon />
          </IconButton>
          {/* <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>*/}
          <IconButton>
            <SavingsRoundedIcon onClick={openSavingsModal} />
          </IconButton>
        </Box>
        <Box className="md:hidden">
          <IconButton>
            <LogoutRoundedIcon onClick={logout} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
