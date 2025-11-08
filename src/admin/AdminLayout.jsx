import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Add Product", path: "/admin/add-product" },
    { label: "Manage Products", path: "/admin/manage-products" },
    { label: "Orders", path: "/admin/orders" },
  ];

  const drawer = (
    <Box sx={{ textAlign: "center", backgroundColor: "#303e4c", height: "100%", color: "#fff" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Admin Panel
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.label}
            button
            component={Link}
            to={item.path}
            sx={{
              textAlign: "left",
              color: "#fff",
              "&:hover": { backgroundColor: "#394a5a" },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* 🧭 Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#303e4c",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            🛠️ Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🧱 Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#303e4c",
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* 📄 Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f1f1f3",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
