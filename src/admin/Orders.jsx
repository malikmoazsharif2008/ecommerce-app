import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";

import { supabase } from "../supabaseClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  // 🔹 Fetch orders from Supabase
  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Fetch Error:", error);
      setLoading(false);
      return;
    }

    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Update order status in Supabase
  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);

    const { error } = await supabase
      .from("orders")
      .update({
        status: newStatus,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Update Error:", error);
      alert("❌ Failed to update order!");
    } else {
      alert(`✅ Order status updated to "${newStatus}"`);
      fetchOrders();
    }

    setUpdating(null);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, color: "#303e4c" }}>
        📦 Manage Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : orders.length === 0 ? (
        <Typography>No orders found 💤</Typography>
      ) : (
        orders.map((o) => (
          <Paper
            key={o.id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="subtitle1">
              🧾 <b>Order ID:</b> {o.id}
            </Typography>
            <Typography>
              👤 <b>Customer:</b> {o.userName || "Unknown"}
            </Typography>
            <Typography>
              💬 <b>Items:</b>{" "}
              {o.items && o.items.length > 0
                ? o.items.map((item) => `${item.name} (x${item.qty})`).join(", ")
                : "No items"}
            </Typography>
            <Typography>
              💰 <b>Total:</b> {o.totalAmount || 0} PKR
            </Typography>
            <Typography>
              📅 <b>Date:</b>{" "}
              {o.createdAt
                ? new Date(o.createdAt).toLocaleString()
                : "N/A"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                select
                size="small"
                value={o.status || "Pending"}
                onChange={(e) => handleStatusChange(o.id, e.target.value)}
                sx={{ width: 180 }}
                disabled={updating === o.id}
              >
                {orderStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="outlined"
                onClick={() => fetchOrders()}
                disabled={updating === o.id}
              >
                🔄 Refresh
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
}
