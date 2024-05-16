import * as React from "react";
import { Link } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  GridViewRoundedIcon,
  MonetizationOnRoundedIcon,
  WalletRoundedIcon,
  AnalyticsIcon,
} from "../../icons";

const BottomBar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box display="flex" justifyContent="center">
      <BottomNavigation
        sx={{ position: "absolute", bottom: 0 }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          icon={<GridViewRoundedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/transaction"
          icon={<MonetizationOnRoundedIcon />}
        />
        <BottomNavigationAction icon={<WalletRoundedIcon />} />
        <BottomNavigationAction icon={<AnalyticsIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default BottomBar;
