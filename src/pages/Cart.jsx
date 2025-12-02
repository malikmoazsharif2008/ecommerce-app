import { Box, Typography, Button, IconButton, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";

const getInitialCart = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [
    { id: 1, name: "Laptop", price: 500, quantity: 1, imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "T-Shirt", price: 20, quantity: 2, imageUrl: "https://via.placeholder.com/150" },
  ];
};

export default function Cart() {
  const [cart, setCart] = useState(getInitialCart());
  const [openCheckout, setOpenCheckout] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", address: "", phone: "" });
  const [errors, setErrors] = useState({});

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (id, value) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: value < 1 ? 1 : value } : item));
  };

  const handleRemove = id => setCart(prev => prev.filter(item => item.id !== id));

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleFormChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      alert("Order placed successfully!");
      setCart([]);
      localStorage.removeItem("cart");
      setOpenCheckout(false);
      setFormData({ name: "", email: "", address: "", phone: "" });
    }
  };

  if (cart.length === 0)
    return (
      <Box sx={{ p: { xs: 2, md: 6 }, textAlign: "center", minHeight: "80vh" }}>
        <Typography variant="h5" sx={{ color: "#304145", fontWeight: 700 }}>
          Your cart is empty
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, minHeight: "80vh", backgroundColor: "#bac7ce10" }}>
      <Typography variant="h4" sx={{ mb: 4, color: "#304145", fontWeight: 700 }}>
        Your Cart
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Cart Items */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          {cart.map(item => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
                alignItems: "center",
                boxShadow: 2,
              }}
            >
             <img
  src={item.imageUrl || item.image_url || "https://via.placeholder.com/150"}
  alt={item.name}
  style={{ width: 100, height: 100, borderRadius: 8, objectFit: "cover" }}
/>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: "#304145" }}>{item.name}</Typography>
                <Typography sx={{ color: "#bd3147", fontWeight: 600 }}>${item.price}</Typography>
                <TextField
                  type="number"
                  label="Qty"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ width: 100, mt: 1 }}
                  size="small"
                />
              </Box>
              <IconButton onClick={() => handleRemove(item.id)} sx={{ color: "#bd3147" }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* Summary */}
        <Box sx={{ flex: 1, backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#304145", fontWeight: 700 }}>
            Order Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ color: "#304145" }}>Subtotal:</Typography>
            <Typography sx={{ fontWeight: 600, color: "#bd3147" }}>${subtotal}</Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#bd3147", "&:hover": { backgroundColor: "#a02a3d" } }}
            onClick={() => setOpenCheckout(true)}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>

      {/* Checkout Form Dialog */}
      <Dialog open={openCheckout} onClose={() => setOpenCheckout(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#304145" }}>Checkout</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenCheckout(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#bd3147", "&:hover": { backgroundColor: "#a02a3d" } }}
            onClick={handleCheckout}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
