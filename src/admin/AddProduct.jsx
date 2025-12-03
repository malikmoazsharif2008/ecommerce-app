// src/admin/AddProduct.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { supabase } from "../supabaseClient";

const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books"];

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrlInput: "",
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  // Snackbar State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState("success"); // success / error

  // Preview for uploaded file OR URL
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (form.imageUrlInput) {
      setPreviewUrl(form.imageUrlInput);
    } else {
      setPreviewUrl(null);
    }
  }, [file, form.imageUrlInput]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const showMessage = (msg, type = "success") => {
    setSnackbarMsg(msg);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price)
      return showMessage("Name & Price required!", "error");

    setLoading(true);
    let finalImageUrl = form.imageUrlInput || null;

    try {
      // Upload local file
      if (file) {
        if (!file.type.startsWith("image/")) {
          setLoading(false);
          return showMessage("Invalid file! Please select an image.", "error");
        }

        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
        setUploadProgress(0);

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) {
          setLoading(false);
          return showMessage("Image upload failed!", "error");
        }

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        finalImageUrl = urlData.publicUrl;
        setUploadProgress(100);
      }

      // Insert into DB
      const { error: insertError } = await supabase.from("products").insert([
        {
          name: form.name,
          price: Number(form.price),
          category: form.category || null,
          description: form.description || null,
          image_url: finalImageUrl,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      showMessage("✔ Product Added Successfully!", "success");

      // Reset form
      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrlInput: "",
      });
      setFile(null);
      setUploadProgress(null);

    } catch (err) {
      showMessage("Error: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, color: "#303e4c" }}>
        ➕ Add New Product
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Image URL (optional)"
            name="imageUrlInput"
            value={form.imageUrlInput}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            placeholder="Paste image link from internet"
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              OR Upload Local File
            </Typography>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{
                marginBottom: 12,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
              }}
            />

            {previewUrl && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body2">Preview:</Typography>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                />
              </Box>
            )}
          </Box>

          {uploadProgress !== null && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#303e4c" }}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Product"}
          </Button>
        </form>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarType}
          sx={{
            width: "100%",
            backgroundColor: snackbarType === "success" ? "#d4ffd4" : "#ffd4d4",
            color: "#000",
          }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
