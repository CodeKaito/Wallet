import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {
  NotificationsOutlinedIcon,
  SettingsOutlinedIcon,
  PersonOutlinedIcon,
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
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box className="hidden sm:flex bg-gray-100 p-1 rounded-lg">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
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
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
