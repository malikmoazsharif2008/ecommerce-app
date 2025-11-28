import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -6 }}
      className="glass-card"
      sx={{ overflow: "hidden" }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image_url || "https://via.placeholder.com/300"}
        alt={product.name || "Product"}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
          {product.name || "Product Name"}
        </Typography>
        <Typography sx={{ color: "var(--accent)", fontWeight: 600, mb: 2 }}>
          ${product.price ?? "0.00"}
        </Typography>
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="contained"
          sx={{
            width: "100%",
            textTransform: "none",
            background:
              "linear-gradient(135deg, var(--primary), var(--primary-dark))",
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
