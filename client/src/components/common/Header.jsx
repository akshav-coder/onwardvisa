import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AirplaneTicket, Menu as MenuIcon } from "@mui/icons-material";
import { Menu, MenuItem, IconButton } from "@mui/material";

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
      }}
    >
      <Toolbar>
        <AirplaneTicket sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          ONWARDVISAS
        </Typography>
        {/* Mobile menu icon */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "white",
            borderColor: "white",
            display: { xs: "flex", md: "none" },
          }}
        >
          SIGN IN
        </Button>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
        {/* Desktop menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button key={page} sx={{ my: 2, display: "block", color: "white" }}>
              {page}
            </Button>
          ))}
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "white",
            borderColor: "white",
            display: { xs: "none", md: "flex" },
          }}
        >
          SIGN IN
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
