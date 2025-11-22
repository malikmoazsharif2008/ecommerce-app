import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category'; // example icon

// Example featured products
const products = [
  { id: 1, name: "Iphone Airpods", image: "https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133", price: "50$" },
  { id: 2, name: "Iphone 12", image: "https://regen.pk/cdn/shop/products/iphone-12-pro-321394_ee217b80-7d48-48ea-bae8-710b41bca458.jpg?v=1674907301&width=1946", price: "$400s" },
  { id: 3, name: "Washing Machine", image: "data:image/jpeg;base64,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", price: "$200" },
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
          backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBlu1wieChQ5J04X62owd3MoCYirRfaxWLQ&")',
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
