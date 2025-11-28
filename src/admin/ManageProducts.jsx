import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";

import { supabase } from "../supabaseClient";

const extractStoragePath = (publicUrl) => {
  if (!publicUrl) return null;
  const marker = "/storage/v1/object/public/product-images/";
  const markerIndex = publicUrl.indexOf(marker);

  if (markerIndex === -1) return null;

  const rawPath = publicUrl.slice(markerIndex + marker.length);
  return decodeURIComponent(rawPath.split("?")[0]);
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // 🔥 Load products
  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      showToast("Failed to load products. Please check Supabase policies.", "error");
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑 DELETE PRODUCT (record + storage image)
  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    // 1) delete product from table
    const { error: deleteErr } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteErr) {
      console.log(deleteErr);
      showToast("Error deleting product. Check Supabase RLS policies.", "error");
      return;
    }

    // 2) delete file from storage (best effort)
    const storagePath = extractStoragePath(imageUrl);
    if (storagePath) {
      const { error: storageErr } = await supabase.storage
        .from("product-images")
        .remove([storagePath]);

      if (storageErr) {
        console.log("Storage delete error:", storageErr);
        showToast("Product deleted but failed to remove image file.", "warning");
      }
    }

    showToast("🗑 Product deleted", "success");
    fetchProducts();
  };

  // ✏️ Edit data load
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
      console.log(error);
      let message = "Update failed! Please try again.";
      if (error.message.includes("row-level security")) {
        message =
          "Update blocked by Supabase Row Level Security. Ensure UPDATE policy exists for 'products'.";
      }
      showToast(message, "error");
      return;
    }

    showToast("✅ Product updated", "success");
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
      ) : products.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography>No products available. Add some first!</Typography>
        </Paper>
      ) : (
        products.map((p) => (
          <Paper
            key={p.id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
            }}
          >
            {editingId === p.id ? (
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <TextField
                  label="Name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  sx={{ mr: 1, mb: { xs: 2, md: 0 } }}
                />
                <TextField
                  label="Price"
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  sx={{ mr: 1, mb: { xs: 2, md: 0 } }}
                />
                <TextField
                  label="Category"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  sx={{ mr: 1, mb: { xs: 2, md: 0 } }}
                />
                <TextField
                  label="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description: e.target.value,
                    })
                  }
                  sx={{ mr: 1, width: { xs: "100%", md: 200 } }}
                  multiline
                  rows={2}
                />

                <Box sx={{ mt: 2 }}>
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
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      width="80"
                      height="80"
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
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
                    onClick={() => handleDelete(p.id, p.image_url)}
                  >
                    🗑 Delete
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        ))
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
