// src/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // 👈 Supabase import
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  // 🔹 FETCH ALL COUNTS
  const loadData = async () => {
    // Products count
    const { count: productCount } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    setProductsCount(productCount || 0);

    // Orders count + last 5 orders
    const { data: orders, count: orderCount } = await supabase
      .from("orders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    setOrdersCount(orderCount || 0);
    setRecentOrders(orders?.slice(0, 5) || []);

    // Users count
    const { count: userCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    setUsersCount(userCount || 0);
  };

  // 🔹 Realtime Listener (Supabase)
  const enableRealtime = () => {
    supabase
      .channel("realtime-admin")
      .on("postgres_changes", { event: "*", schema: "public" }, () => {
        loadData(); // refresh dashboard instantly
      })
      .subscribe();
  };

  useEffect(() => {
    loadData();
    enableRealtime();
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
            {recentOrders.length === 0 && (
              <ListItem>
                <ListItemText primary="No recent orders" />
              </ListItem>
            )}

            {recentOrders.map((o) => (
              <ListItem key={o.id} divider>
                <ListItemText
                  primary={`Order #${o.id}`}
                  secondary={`Customer: ${
                    o.customerName || "Unknown"
                  } — Total: ${o.total || 0} PKR`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
