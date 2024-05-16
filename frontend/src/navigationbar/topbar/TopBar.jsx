import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {
  NotificationsOutlinedIcon,
  SettingsOutlinedIcon,
  SearchIcon,
  AddIcon,
} from "../../icons";
import AddPaymentModal from "../../utils/AddPaymentModal";

const TopBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && <AddPaymentModal onClose={handleCloseModal} />}
      <Box display="flex" justifyContent={{ xs: "space-between" }} p={2}>
        <Box className="hidden sm:flex bg-gray-100 p-1 rounded-lg">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box className="xs:block sm:hidden">
          <IconButton>
            <img
              alt="profile-user"
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="pointer rounded-full"
              width={50}
              height={50}
            />
          </IconButton>
        </Box>

        {/* Icons */}
        <Box className="flex">
          <IconButton>
            <AddIcon onClick={handleAddButtonClick} />
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
