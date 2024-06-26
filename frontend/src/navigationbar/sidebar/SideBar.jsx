import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useAuth } from "../../context/AuthContext";
import {
  MenuRoundedIcon,
  GridViewRoundedIcon,
  ReceiptRoundedIcon,
  BarChartRoundedIcon,
  TimelineRoundedIcon,
  PieChartIcon,
  MonetizationOnRoundedIcon,
  LogoutRoundedIcon,
  TodayIcon,
} from "../../icons";

const MySideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { collapseSidebar } = useProSidebar();
  const { logout } = useAuth();
  const { userData } = useUser();

  const defaultAvatarUrl =
    "https://res.cloudinary.com/dkj3atfao/image/upload/v1716812728/users/x2gbjdreqfspgokuevtd.jpg";

  useEffect(() => {
    collapseSidebar();
    const handleResize = () => {
      if (window.innerWidth < 700) {
        collapseSidebar(true);
        setCollapsed(false);
      } else {
        collapseSidebar(false);
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    collapseSidebar();
  };

  return (
    <Box className="bg-gray-200 fixed top-0 z-50">
      <Sidebar
        className="h-screen"
        backgroundColor="#141B2D"
        transitionDuration={800}
      >
        <Menu iconShape="square">
          <section>
            <MenuItem
              className="menu1 hidden md:block"
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
                <Typography variant="h5" color="gray-200" className="uppercase">
                  Hades
                </Typography>
              </Box>
            </MenuItem>

            <MenuItem className="menu1 md:hidden mt-20 flex justify-center">
              <img
                alt="profile-user"
                src={userData ? userData?.avatar : defaultAvatarUrl}
                className="pointer rounded-full object-cover"
                width={100}
              />
            </MenuItem>

            {!collapsed && (
              <Box className="hidden md:block my-10">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    src={userData ? userData?.avatar : defaultAvatarUrl}
                    className="pointer rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h6"
                    color="rgb(184, 184, 184)"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                    className=""
                  >
                    {userData.name || userData.surname
                      ? `${userData.name}`
                      : userData.name && userData.surname
                      ? `${userData.name} ${userData.surname}`
                      : "User"}
                  </Typography>
                  {/* <Typography
                    variant="h7"
                    color="rgb(184, 184, 184)"
                    className=""
                  >
                    DevOps Engineer
                  </Typography> */}
                </Box>
              </Box>
            )}

            <Box paddingLeft={collapsed ? undefined : "10%"}>
              <MenuItem
                component={<Link to="/" className="link" />}
                icon={<GridViewRoundedIcon />}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={<Link to="transaction" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Expenses
              </MenuItem>
              <MenuItem
                component={<Link to="income" className="link" />}
                icon={<MonetizationOnRoundedIcon />}
              >
                Income
              </MenuItem>

              <MenuItem
                component={<Link to="calendar" className="link" />}
                icon={<TodayIcon />}
              >
                Calendar
              </MenuItem>
              {/* <MenuItem
                component={<Link to="savings" className="link" />}
                icon={<SavingsRoundedIcon />}
              >
                Savings
              </MenuItem> */}
              <MenuItem
                component={<Link to="bar" className="link" />}
                icon={<BarChartRoundedIcon />}
              >
                BarChart
              </MenuItem>
              <MenuItem
                component={<Link to="line" className="link" />}
                icon={<TimelineRoundedIcon />}
              >
                TimeLine
              </MenuItem>
              <MenuItem
                component={<Link to="pie" className="link" />}
                icon={<PieChartIcon />}
              >
                PieChart
              </MenuItem>
            </Box>
          </section>
          <div className="mt-auto">
            <MenuItem
              onClick={logout}
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
