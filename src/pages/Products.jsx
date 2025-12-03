// src/components/Products.jsx
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Pagination,
  Snackbar,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";

const categories = ["All", "Electronics", "Clothing", "Home & Kitchen", "Books"];
const PRODUCTS_PER_PAGE = 8;

export default function Products() {
  const [productsData, setProductsData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setProductsData(data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // 🔹 Filter products
  const filtered = useMemo(() => {
    return productsData.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [productsData, category, search]);

  const pageCount = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const displayedProducts = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // 🔹 Add to cart
  const handleAddToCart = (product) => {
    let updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 6,
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 60%)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "#f5f7fb",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Discover Products
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: "100%", sm: 400 },
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 3,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.2)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.4)",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--primary)",
              },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
          mb: 4,
        }}
      >
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
            color={category === cat ? "primary" : "default"}
            sx={{
              px: 1.5,
              py: 0.5,
              backgroundColor:
                category === cat ? "var(--primary)" : "rgba(255,255,255,0.08)",
              color: "#fff",
              borderRadius: "999px",
              border:
                category === cat
                  ? "1px solid rgba(255,255,255,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <Typography>Loading products...</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
              lg: "repeat(4,1fr)",
            },
            gap: 3,
          }}
        >
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, idx) => (
              <Card
                key={product.id}
                component={motion.div}
                whileHover={{ y: -6 }}
                transition={{ delay: idx * 0.02 }}
                className="glass-card"
                sx={{ overflow: "hidden" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image_url || "https://via.placeholder.com/400"}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography
                    sx={{ color: "var(--accent)", fontWeight: 600, mb: 2 }}
                  >
                    ${product.price}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "#fff",
                      textTransform: "none",
                      mb: 1,
                      width: "100%",
                      "&:hover": { borderColor: "#fff" },
                    }}
                  >
                    View details
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      background:
                        "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                      width: "100%",
                    }}
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "#f5f5f5", gridColumn: "1 / -1" }}
            >
              No products found.
            </Typography>
          )}
        </Box>
      )}

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
              },
              "& .MuiPaginationItem-page": {
                color: "#fff",
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "var(--primary)",
                color: "#fff",
              },
              "& .MuiPaginationItem-icon": {
                color: "#fff",
              },
            }}
          />
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        message="Added to cart!"
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            fontWeight: 500,
          },
        }}
      />
    </Box>
  );
}
