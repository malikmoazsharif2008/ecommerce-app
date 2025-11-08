import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Box, TextField, Button, Typography } from "@mui/material";

const ADMIN_EMAIL = "malikmoazsharif2008@gmail.com";

export default function AdminLock({ onUnlock }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.email === ADMIN_EMAIL) {
        localStorage.setItem("adminLoggedIn", "true");
        if (typeof onUnlock === "function") onUnlock();
      } else {
        setError("Access Denied: You are not an admin.");
        await signOut(auth);
      }
    } catch (err) {
      setError("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
        p: 2,
      }}
    >
      <Box component="form" onSubmit={handleLogin} sx={{ width: 340, bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>🔒 Admin Login</Typography>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 1 }} />
        {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#bd3147" }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
}
