import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import credentials from "./adminCredentials.json";

export default function AdminLock() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (sessionStorage.getItem("isAdminAuthenticated") === "true") {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const isValid =
      trimmedUsername === credentials.username && trimmedPassword === credentials.password;

    if (isValid) {
      sessionStorage.setItem("isAdminAuthenticated", "true");
      navigate(from, { replace: true });
    } else {
      setError("Invalid username or password.");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <Box component="form" onSubmit={handleLogin} sx={{ width: 360, bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>🔒 Admin Login</Typography>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 1 }} />
        {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#bd3147" }} disabled={loading}>
          {loading ? "Checking..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
}
