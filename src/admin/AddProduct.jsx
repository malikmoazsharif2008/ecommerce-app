import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product added:", product);
    alert("✅ Product added successfully!");
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f1f1f3", minHeight: "100vh" }}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", borderRadius: 3 }}>
        <Typography variant="h5" mb={3} color="#303e4c" fontWeight={600}>
          ➕ Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Product Name"
            value={product.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="price"
            label="Price"
            type="number"
            value={product.price}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="image"
            label="Image URL"
            value={product.image}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={3}
            value={product.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#303e4c",
              "&:hover": { backgroundColor: "#1976d2" },
            }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
