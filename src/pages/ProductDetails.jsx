// src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
} from "@mui/material";
import { supabase } from "../supabaseClient";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setSnackbarOpen(true);
  };

  if (loading) return <Typography textAlign="center">Loading...</Typography>;
  if (!product) return <Typography textAlign="center">Product not found</Typography>;

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, p: 3 }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          image={product.image_url || "https://via.placeholder.com/400"}
          alt={product.name}
          sx={{ width: { xs: "100%", md: "50%" }, borderRadius: 2, objectFit: "cover" }}
        />

        {/* Product Info */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Rs {product.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description || "No description available."}
          </Typography>

          {/* Quantity Selector */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => qty > 1 && setQty(qty - 1)}
            >
              -
            </Button>
            <Typography>{qty}</Typography>
            <Button
              variant="outlined"
              onClick={() => setQty(qty + 1)}
            >
              +
            </Button>
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      {/* Extra Information */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Product Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.long_description || "This product is made with premium quality material. Full specifications coming soon."}
        </Typography>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        message="Added to cart!"
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
