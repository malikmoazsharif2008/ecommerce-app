// src/admin/AddProduct.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography, MenuItem, LinearProgress } from "@mui/material";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books"];

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "" });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert("Name & price are required");
    setLoading(true);

    try {
      let imageUrl = "";

      // If file selected, upload first
      if (file) {
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(prog);
            },
            (err) => {
              console.error("Upload error:", err);
              reject(err);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Add product to Firestore
      let  response=  await addDoc(collection(db, "products"), {
        ...form,
        price: Number(form.price),
        imageUrl,
        createdAt: serverTimestamp(),
      });
      console.log({response})
      // Reset form
      setForm({ name: "", price: "", category: "", description: "" });
      setFile(null);
      setUploadProgress(null);
      alert("Product added successfully!");
    } catch (err) {
      console.error("Firestore error:", err);
      alert("Error adding product. Check console for details.");
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files && e.target.files[0])}
            style={{ marginBottom: 12 }}
          />

          {uploadProgress !== null && (
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 2 }} />
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
    </Box>
  );
}
