import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {
  NotificationsOutlinedIcon,
  SettingsOutlinedIcon,
  PersonOutlinedIcon,
  SearchIcon,
  AccountBalanceIcon,
} from "../../icons";

const TopBar = () => {
  return (
    <Box className="flex justify-end sm:justify-between p-2">
      <Box className="hidden sm:flex bg-gray-100 p-1 rounded-lg">
        <InputBase className="ml-2 flex-1" placeholder="Search..." />
        <IconButton type="button" className="px-1">
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box className="flex">
        <IconButton>
          <AccountBalanceIcon />
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
  );
};

export default TopBar;
