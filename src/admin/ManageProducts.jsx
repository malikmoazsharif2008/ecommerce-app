import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
} from "@mui/material";

const mockProducts = [
  { id: 1, name: "iPhone 15", price: 1200 },
  { id: 2, name: "Samsung S24", price: 999 },
  { id: 3, name: "MacBook Air", price: 1500 },
];

export default function ManageProducts() {
  const handleDelete = (id) => {
    alert(`🗑️ Deleted product with ID: ${id}`);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f1f1f3", minHeight: "100vh" }}>
      <Typography variant="h4" color="#303e4c" fontWeight={600} mb={3}>
        Manage Products
      </Typography>
      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#303e4c" }}>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Price</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDelete(p.id)}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
