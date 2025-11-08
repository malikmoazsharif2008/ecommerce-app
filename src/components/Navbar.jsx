import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Slide,
  InputBase,
  Badge,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const pages = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Cart", path: "/cart" },
  { label: "Login", path: "/login" },
  { label: "Admin", path: "/admin/dashboard" },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#303e4c",
        color: "#f1f1f3",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        width: "100vw", // ✅ full screen width
        left: 0,
        right: 0,
        top: 0,
        margin: 0,
        padding: 0,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          maxWidth: "100%",
          px: { xs: 2, sm: 4, md: 8 },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* 🛍️ Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#f1f1f3",
            fontWeight: 700,
            fontSize: "1.6rem",
            "&:hover": { color: "#ffffff" },
          }}
        >
          🛍️ E-Shop
        </Typography>

        {/* 📱 Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            TransitionComponent={Slide}
            TransitionProps={{ direction: "down" }}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                backgroundColor: "#303e4c",
                color: "#f1f1f3",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                minWidth: 220,
              },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.label}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{
                  px: 3,
                  py: 1.5,
                  textDecoration: "none",
                  "&:hover": { backgroundColor: "#3d4d5c" },
                }}
              >
                {page.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* 🔍 Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: 500,
            mx: 3,
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            backgroundColor: "#3b4a58",
            borderRadius: "999px",
            px: 2,
          }}
        >
          <SearchIcon sx={{ mr: 1, color: "#ccc" }} />
          <InputBase
            placeholder="Search products..."
            sx={{ color: "#f1f1f3", width: "100%" }}
          />
        </Box>

        {/* 🖥️ Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {pages.map((page) => (
            <Button
              key={page.label}
              component={Link}
              to={page.path}
              sx={{
                color: "#f1f1f3",
                fontWeight: 500,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { color: "#ffffff" },
              }}
            >
              {page.label}
            </Button>
          ))}
        </Box>
<<<<<<< HEAD
=======

        
      
>>>>>>> main
      </Toolbar>
    </AppBar>
  );
}
