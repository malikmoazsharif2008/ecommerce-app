import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // ✅ Accept any email/password for demo
      const user = { email: formData.email, loggedIn: true };
      localStorage.setItem("user", JSON.stringify(user)); // Save user info
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      setTimeout(() => navigate("/"), 1000); // redirect to Home
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, width: "100%", p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: "#fff" }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#304145", fontWeight: 700 }}>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={formData.remember} onChange={handleChange} name="remember" />}
          label="Remember me"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#bd3147", "&:hover": { backgroundColor: "#a02a3d" } }}
        >
          Login
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
