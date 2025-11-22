import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";

import { supabase } from "../supabaseClient"; // ✅ Supabase import

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // 🔥 Load products from Supabase
  const fetchProducts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setProducts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑 Delete Product (database + image)
  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    // delete from table
    const { error: deleteErr } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteErr) {
      alert("Error deleting!");
      console.log(deleteErr);
      return;
    }

    // delete from Supabase Storage
    if (imageUrl) {
      const path = imageUrl.split("/").pop(); // extract file name

      await supabase.storage
        .from("product-images")
        .remove([path]);
    }

    alert("🗑 Product deleted");
    fetchProducts();
  };

  // ✏️ Edit product
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });
  };

  // 💾 Update product
  const handleUpdate = async (id) => {
    const { error } = await supabase
      .from("products")
      .update({
        ...editForm,
        price: Number(editForm.price),
      })
      .eq("id", id);

    if (error) {
      alert("Update failed!");
      console.log(error);
      return;
    }

    alert("✅ Product updated");
    setEditingId(null);
    fetchProducts();
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, color: "#303e4c" }}>
        🛠 Manage Products
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        products.map((p) => (
          <Paper
            key={p.id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {editingId === p.id ? (
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  label="Name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  sx={{ mr: 1 }}
                />
                <TextField
                  label="Price"
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  sx={{ mr: 1 }}
                />
                <TextField
                  label="Category"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  sx={{ mr: 1 }}
                />
                <TextField
                  label="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  sx={{ mr: 1, width: 200 }}
                />

                <Button
                  variant="contained"
                  onClick={() => handleUpdate(p.id)}
                  sx={{ backgroundColor: "#303e4c", mr: 1 }}
                >
                  Save
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {p.imageUrl && (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      width="80"
                      height="80"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                  )}
                  <Box>
                    <Typography variant="subtitle1">{p.name}</Typography>
                    <Typography variant="body2">💰 {p.price} PKR</Typography>
                    <Typography variant="body2">
                      🏷 {p.category || "N/A"}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(p)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(p.id, p.imageUrl)}
                  >
                    🗑 Delete
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
}
