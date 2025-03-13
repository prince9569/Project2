import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Drawor from "./Drawor";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/Loginslice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.login);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const token = localStorage.getItem("jwt");
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const username = localStorage.getItem("user");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Contact", path: "/contact" },
    { text: "About", path: "/about" },
    { text: "Doctors", path: "/doctor" },
    { text: "Services", path: "/services" },
    { text: "Ambulance", path: "/ambulance-booking" },
  ];

  return (
    <AppBar sx={{ background: "#e3f2fd", position: "fixed", top: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <IconButton component={Link} to="/" sx={{ p: 0 }}>
          <img
            src={logo}
            alt="logo"
            style={{ borderRadius: "50%", width: 70, height: 70 }}
          />
        </IconButton>

        {/* Navigation for larger screens */}
        {!isMobile ? (
          <>
            <List sx={{ display: "flex", gap: "20px" }}>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      textAlign: "center",
                      "&:hover": { background: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    <ListItemText primary={item.text} sx={{ color: "black" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            {/* User Menu */}
            <Box sx={{ marginLeft: "auto" }}>
              {token ? (
                <>
                  <Tooltip title={username}>
                    <IconButton onClick={handleMenuOpen}>
                      <Avatar />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{ "aria-labelledby": "basic-button" }}
                  >
                    {!isAdmin && (
                      <>
                        <MenuItem component={NavLink} to="/appointment">
                          Appointment
                        </MenuItem>
                        <MenuItem component={NavLink} to="/userprofile">
                          Profile
                        </MenuItem>
                      </>
                    )}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    aria-controls={open ? "login-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                  >
                    Login
                  </Button>
                  <Menu
                    id="login-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={NavLink} to="/login">
                      Login as User
                    </MenuItem>
                    <MenuItem component={NavLink} to="/doctorlogin">
                      Login as Doctor
                    </MenuItem>
                  </Menu>
                  <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to="/SignUp"
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Drawor />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
