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
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const pages = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Cart", path: "/cart" },
  { label: "Login", path: "/login" },
  { label: "Admin", path: "/admin/dashboard" },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(120deg, rgba(15,23,42,0.95), rgba(48,62,76,0.85))",
        color: "#f1f1f3",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        width: "100vw",
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
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#f1f1f3",
              fontWeight: 700,
              fontSize: "1.6rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { color: "#ffffff" },
            }}
          >
            🛍️ E-Shop
          </Typography>
        </motion.div>

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
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {pages.map((page) => (
            <motion.div
              key={page.label}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Button
                component={Link}
                to={page.path}
                sx={{
                  color: "#f1f1f3",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "1rem",
                  borderRadius: "999px",
                  px: 2.5,
                  backgroundColor:
                    page.path === "/products" ? "rgba(255,255,255,0.08)" : "transparent",
                  border: "1px solid transparent",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.2)",
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                {page.label}
              </Button>
            </motion.div>
          ))}
        </Box>



        
      

      </Toolbar>
    </AppBar>
  );
}