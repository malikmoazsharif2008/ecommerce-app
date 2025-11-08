// src/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Grid, Paper, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, "products"), (snap) => setProductsCount(snap.size));
    const unsubOrders = onSnapshot(collection(db, "orders"), (snap) => {
      setOrdersCount(snap.size);
      const recent = snap.docs
        .slice(-5)
        .reverse()
        .map((d) => ({ id: d.id, ...d.data() }));
      setRecentOrders(recent);
    });
    const handleLogout = () => {
  localStorage.removeItem("adminLoggedIn");
  window.location.reload();
};

    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => setUsersCount(snap.size));

    return () => {
      unsubProducts();
      unsubOrders();
      unsubUsers();
    };
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, color: "#303e4c" }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Products</Typography>
            <Typography variant="h5" fontWeight={700}>
              {productsCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Orders</Typography>
            <Typography variant="h5" fontWeight={700}>
              {ordersCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Users</Typography>
            <Typography variant="h5" fontWeight={700}>
              {usersCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Orders
        </Typography>
        <Paper>
          <List>
            {recentOrders.length === 0 && <ListItem><ListItemText primary="No recent orders" /></ListItem>}
            {recentOrders.map((o) => (
              <ListItem key={o.id} divider>
                <ListItemText
                  primary={`Order #${o.id || o.orderId || o.id}`}
                  secondary={`Customer: ${o.customerName || o.customer || "N/A"} — Total: ${o.total || o.amount || "0"}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
