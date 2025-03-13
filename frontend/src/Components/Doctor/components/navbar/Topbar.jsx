import React, { useState, useContext } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, Tooltip, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../theme";

import { LightModeOutlined, DarkModeOutlined, PersonOutline } from "@mui/icons-material";

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: theme.palette.background.default,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
        HealthCare Portal
      </Typography>

      {/* Actions: Theme Switch & Profile */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Theme Toggle */}
        <Tooltip title={theme.palette.mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
        </Tooltip>

        {/* Profile Menu */}
        <Tooltip title="Profile">
          <IconButton onClick={handleClick} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
              <PersonOutline />
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Profile Dropdown */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ mt: 1 }}
          MenuListProps={{
            "aria-labelledby": "profile-button",
          }}
        >
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
