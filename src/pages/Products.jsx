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
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Example product data
const productsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Home & Kitchen", "Books"][i % 4],
  price: (i + 1) * 10,
  image: "https://via.placeholder.com/200",
}));

const categories = ["All", "Electronics", "Clothing", "Home & Kitchen", "Books"];
const PRODUCTS_PER_PAGE = 8;

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const filtered = productsData.filter((p) => {
    const matchCategory = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const pageCount = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const displayedProducts = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

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
        py: 4,
        minHeight: "100vh",
        backgroundColor: "#bac7ce10",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "#304145",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Products
      </Typography>

      {/* Search */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <TextField
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: "100%", sm: 400 },
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Categories */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mb: 4,
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "contained" : "outlined"}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
            sx={{
              backgroundColor: category === cat ? "#bd3147" : "#fff",
              color: category === cat ? "#fff" : "#304145",
              borderColor: "#bd3147",
              "&:hover": { backgroundColor: "#a02a3d", color: "#fff" },
              textTransform: "none",
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {/* Products Grid */}
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
        {displayedProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={product.image}
              alt={product.name}
            />
            <CardContent sx={{ backgroundColor: "#bac7ce" }}>
              <Typography variant="h6" sx={{ color: "#304145", mb: 1 }}>
                {product.name}
              </Typography>
              <Typography
                sx={{ color: "#bd3147", fontWeight: 600, mb: 2 }}
              >
                ${product.price}
              </Typography>
              <Button
                component={Link}
                to={`/product/${product.id}`}
                variant="contained"
                sx={{
                  backgroundColor: "#304145",
                  "&:hover": { backgroundColor: "#3b4a58" },
                  width: "100%",
                  mb: 1,
                }}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                onClick={() => handleAddToCart(product)}
                sx={{
                  backgroundColor: "#bd3147",
                  "&:hover": { backgroundColor: "#a02a3d" },
                  width: "100%",
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Snackbar Feedback */}
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
