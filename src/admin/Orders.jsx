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
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  // 🔹 Fetch orders from Firestore
  const fetchOrders = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "orders"));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOrders(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Update order status
  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    await updateDoc(doc(db, "orders", id), {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
    alert(`✅ Order status updated to "${newStatus}"`);
    setUpdating(null);
    fetchOrders();
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
              {o.createdAt?.toDate
                ? o.createdAt.toDate().toLocaleString()
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
