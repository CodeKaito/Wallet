import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import {
  MenuRoundedIcon,
  GridViewRoundedIcon,
  ReceiptRoundedIcon,
  BarChartRoundedIcon,
  TimelineRoundedIcon,
  BubbleChartRoundedIcon,
  WalletRoundedIcon,
  AccountBalanceRoundedIcon,
  SavingsRoundedIcon,
  MonetizationOnRoundedIcon,
  LogoutRoundedIcon,
  TodayIcon,
  AddIcon,
} from "../../icons";

const MySideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { collapseSidebar } = useProSidebar();

  useEffect(() => {
    collapseSidebar();

    const handleResize = () => {
      if (window.innerWidth < 700 && !collapsed) {
        collapseSidebar();
      }
    };

    handleResize();
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    collapseSidebar();
  };

  return (
    <Box className="bg-gray-200">
      <Sidebar className="h-screen" backgroundColor="#141B2D">
        <Menu iconShape="square">
          <section>
            <MenuItem
              component={<Link to="/" className="link" />}
              className="menu1 hidden sm:flex"
              icon={
                <MenuRoundedIcon
                  onClick={() => {
                    handleToggleCollapse();
                  }}
                />
              }
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color="gray-200">
                  Wallet
                </Typography>
              </Box>
            </MenuItem>

            <MenuItem className="menu1 sm:hidden mt-10">
              <img
                alt="profile-user"
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="pointer rounded-full object-cover"
                width={200}
              />
            </MenuItem>

            {!collapsed && (
              <Box className="my-10">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="pointer rounded-full object-cover"
                    width={100}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h6"
                    color="rgb(184, 184, 184)"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Jerome Decinco
                  </Typography>
                  <Typography variant="h7" color="rgb(184, 184, 184)">
                    DevOps Engineer
                  </Typography>
                </Box>
              </Box>
            )}

            <MenuItem
              component={<Link to="dashboard" className="link" />}
              icon={<GridViewRoundedIcon />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              component={<Link to="new" className="link" />}
              icon={<AddIcon />}
            >
              Add payment
            </MenuItem>
            <MenuItem className="link" icon={<ReceiptRoundedIcon />}>
              Invoices
            </MenuItem>
            <MenuItem
              component={<Link to="transaction" className="link" />}
              icon={<MonetizationOnRoundedIcon />}
            >
              Transactions
            </MenuItem>
            <MenuItem
              component={<Link to="savings" className="link" />}
              icon={<WalletRoundedIcon />}
            >
              Wallet
            </MenuItem>
            <MenuItem
              component={<Link to="savings" className="link" />}
              icon={<AccountBalanceRoundedIcon />}
            >
              Balance
            </MenuItem>
            <MenuItem
              component={<Link to="savings" className="link" />}
              icon={<TodayIcon />}
            >
              Calendar
            </MenuItem>
            <MenuItem
              component={<Link to="savings" className="link" />}
              icon={<SavingsRoundedIcon />}
            >
              Savings
            </MenuItem>
            <MenuItem
              component={<Link to="savings" className="link" />}
              icon={<BarChartRoundedIcon />}
            >
              BarChart
            </MenuItem>
            <MenuItem
              component={<Link to="savings" className="link" />}
              icon={<TimelineRoundedIcon />}
            >
              TimeLine
            </MenuItem>
            <MenuItem
              component={<Link to="savings" className="link" />}
              icon={<BubbleChartRoundedIcon />}
            >
              BubbleChart
            </MenuItem>
          </section>
          <div className="mt-auto">
            <MenuItem
              className="d-flex justify-end"
              icon={<LogoutRoundedIcon />}
            >
              {" "}
              Logout{" "}
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MySideBar;
