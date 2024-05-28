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
        className="fixed bottom-0 w-full"
        showLabels
        value={value}
        onChange={(newValue) => {
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
          to="/transactionMobile"
          icon={<MonetizationOnRoundedIcon />}
        />
        <BottomNavigationAction icon={<WalletRoundedIcon />} />
        <BottomNavigationAction
          component={Link}
          to="/charts"
          icon={<AnalyticsIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomBar;
