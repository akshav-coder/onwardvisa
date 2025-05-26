import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  // Container, // Not used in this component, removed for cleaner code
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AirplaneTicket, Menu as MenuIcon } from "@mui/icons-material";

const Header = () => {
  const pages = ["Home", "Blogs", "How It Works", "Contact Us"];
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        width: "100%",
        px: { xs: 2, md: 4 },
      }}
    >
      <Toolbar
        disableGutters
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        {/* Logo and Title Section (Left aligned) */}
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {" "}
          {/* flexShrink: 0 to prevent shrinking */}
          <AirplaneTicket sx={{ mr: 1, color: "white" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            ONWARDVISAS
          </Typography>
        </Box>

        {/* Desktop Menu (Centered) */}
        <Box
          sx={{
            flexGrow: 1, // Allows this box to take available space
            display: { xs: "none", md: "flex" },
            justifyContent: "center", // Centers the items horizontally within this box
            alignItems: "center", // Ensures items are vertically centered
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                mx: 2, // Horizontal margin between navigation items
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* Sign In Button (Right aligned for desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, flexShrink: 0 }}>
          {" "}
          {/* flexShrink: 0 to prevent shrinking */}
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "white",
              ml: 3, // Left margin to separate from the centered menu
            }}
          >
            SIGN IN
          </Button>
        </Box>

        {/* Mobile menu (icon and button - remains on the right) */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "white",
              mr: 1,
            }}
          >
            SIGN IN
          </Button>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
