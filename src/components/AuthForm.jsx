import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, Typography, Box } from "@mui/material";

const AuthForm = ({ title, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, name });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-screen"
    >
      <Box
        sx={{
          p: 4,
          width: 360,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          {title === "Register" && (
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {title}
          </Button>
        </form>
      </Box>
    </motion.div>
  );
};

export default AuthForm;
