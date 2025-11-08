import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category'; // example icon

// Example featured products
const products = [
  { id: 1, name: "Product 1", image: "", price: "$50" },
  { id: 2, name: "Product 2", image: "", price: "$60" },
  { id: 3, name: "Product 3", image: "", price: "$70" },
];

// Example categories
const categories = [
  { id: 1, name: "Electronics", icon: <CategoryIcon sx={{ fontSize: 40, color: "#bd3147" }} /> },
  { id: 2, name: "Clothing", icon: <CategoryIcon sx={{ fontSize: 40, color: "#bd3147" }} /> },
  { id: 3, name: "Home & Kitchen", icon: <CategoryIcon sx={{ fontSize: 40, color: "#bd3147" }} /> },
  { id: 4, name: "Books", icon: <CategoryIcon sx={{ fontSize: 40, color: "#bd3147" }} /> },
];

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#bac7ce10", pb: 6 }}>
      
      {/* Hero Banner */}
      <Box
        sx={{
          height: { xs: 220, sm: 300, md: 400 },
          backgroundImage: 'url("https://via.placeholder.com/1200x400")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#ffffff",
          mb: 6,
          position: "relative",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(48, 65, 69, 0.6)",
            borderRadius: 2,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: { xs: "100%", sm: "80%", md: "60%" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            }}
          >
            Welcome to E-Shop 🛍️
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.5rem" },
            }}
          >
            Find your favorite products at the best prices!
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            sx={{
              backgroundColor: "#bd3147",
              "&:hover": { backgroundColor: "#a02a3d" },
              color: "#fff",
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Categories Section */}
      <Box sx={{ px: { xs: 2, md: 4 }, mb: 6 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#304145", fontWeight: 700, textAlign: "center" }}
        >
          Browse by Categories
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {categories.map((cat) => (
            <Card
              key={cat.id}
              component={Link}
              to={`/products?category=${cat.name}`}
              sx={{
                maxWidth: 180,
                flex: "1 1 140px",
                borderRadius: 3,
                textAlign: "center",
                textDecoration: "none",
                color: "#304145",
                py: 3,
                boxShadow: 3,
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
                transition: "0.3s",
              }}
            >
              <Box sx={{ mb: 1 }}>{cat.icon}</Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {cat.name}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Featured Products */}
      <Box sx={{ px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#304145", fontWeight: 700, textAlign: "center" }}
        >
          Featured Products
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                maxWidth: 250,
                borderRadius: 2,
                boxShadow: 3,
                flex: "1 1 200px",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ backgroundColor: "#bac7ce" }}>
                <Typography variant="h6" sx={{ color: "#304145" }}>
                  {product.name}
                </Typography>
                <Typography sx={{ color: "#bd3147", fontWeight: 600 }}>
                  {product.price}
                </Typography>
                <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor: "#304145",
                    "&:hover": { backgroundColor: "#3b4a58" },
                  }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
