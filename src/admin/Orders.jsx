import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

const mockOrders = [
  { id: 101, customer: "Ali", total: "$250", status: "Pending" },
  { id: 102, customer: "Sara", total: "$480", status: "Delivered" },
  { id: 103, customer: "Moaz", total: "$320", status: "Pending" },
];

export default function Orders() {
  const handleStatusChange = (id) => {
    alert(`✅ Order ${id} marked as delivered!`);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f1f1f3", minHeight: "100vh" }}>
      <Typography variant="h4" color="#303e4c" fontWeight={600} mb={3}>
        Manage Orders
      </Typography>
      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#303e4c" }}>
              <TableCell sx={{ color: "#fff" }}>Order ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Customer</TableCell>
              <TableCell sx={{ color: "#fff" }}>Total</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((o) => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell>{o.total}</TableCell>
                <TableCell>{o.status}</TableCell>
                <TableCell>
                  {o.status === "Pending" && (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#135cb1" },
                      }}
                      onClick={() => handleStatusChange(o.id)}
                    >
                      Mark Delivered
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
