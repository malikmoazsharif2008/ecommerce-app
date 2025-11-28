import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CategoryIcon from "@mui/icons-material/Category";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: <CategoryIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
  },
  {
    id: 2,
    name: "Clothing",
    icon: <CategoryIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
  },
  {
    id: 3,
    name: "Home & Kitchen",
    icon: <CategoryIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
  },
  {
    id: 4,
    name: "Books",
    icon: <CategoryIcon sx={{ fontSize: 40, color: "var(--accent)" }} />,
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);

      if (!error && data) setProducts(data);
      else console.log("Error fetching products:", error);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 8,
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 60%)",
      }}
    >
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          height: { xs: 320, sm: 380, md: 460 },
          borderRadius: 5,
          mx: { xs: 2, md: 6 },
          mt: 6,
          background:
            "linear-gradient(135deg, rgba(255,77,109,0.95), rgba(25,36,58,0.95))",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, zIndex: 2 }}>
          Future-ready shopping is here.
        </Typography>
      </Box>

      {/* Categories */}
      <Box sx={{ px: { xs: 2, md: 6 }, mt: 8 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#f5f7fb", fontWeight: 700, textAlign: "center" }}
        >
          Browse by category
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                component={Link}
                to={`/products?category=${cat.name}`}
                className="glass-card"
                sx={{
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#fff",
                  py: 4,
                }}
              >
                <Box sx={{ mb: 1 }}>{cat.icon}</Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {cat.name}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Featured Products */}
      <Box sx={{ px: { xs: 2, md: 6 }, mt: 8 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#f5f7fb", fontWeight: 700, textAlign: "center" }}
        >
          Featured Picks
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography
            sx={{
              color: "#ccc",
              textAlign: "center",
              fontSize: "1.2rem",
              py: 5,
            }}
          >
            No products available yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {products.map((product, index) => (
              <Card
                key={product.id}
                component={motion.div}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-card"
                sx={{ overflow: "hidden" }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={product.image_url}
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
                    PKR {product.price}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    sx={{
                      textTransform: "none",
                      color: "#0f172a",
                      fontWeight: 600,
                      backgroundColor: "rgba(255,255,255,0.9)",
                      "&:hover": { backgroundColor: "#fff" },
                    }}
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
