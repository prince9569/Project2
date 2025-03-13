import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import { Edit, HomeOutlined, HelpOutlined, MenuOutlined } from "@mui/icons-material";

const SidebarItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        transition: "background-color 0.3s ease-in-out",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography variant="body1" fontWeight="bold">
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar1 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "8px 30px 8px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
          backgroundColor: "rgba(255, 255, 255, 0.05) !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
          backgroundColor: "rgba(255, 255, 255, 0.1) !important",
        },
        minHeight: "100vh",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND COLLAPSE ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography
                  variant="h3"
                  onClick={() => navigate("/")}
                  sx={{ cursor: "pointer", fontWeight: "bold" }}
                  color={colors.grey[100]}
                >
                  Doctor Panel
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Home"
              to="/"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Users"
              to="/users"
              icon={<HelpOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Edit Profile"
              to="/editprofile"
              icon={<Edit />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar1;
