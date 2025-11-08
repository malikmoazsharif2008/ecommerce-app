import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { db, storage } from "../firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

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

  // 🔹 Load all products from Firestore
  const fetchProducts = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "products"));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Delete product from Firestore + Storage
  const handleDelete = async (id, imageUrl) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef).catch(() => {});
      }
      alert("🗑 Product deleted");
      fetchProducts();
    }
  };

  // 🔹 Edit (update) product
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "products", id), {
      ...editForm,
      price: Number(editForm.price),
    });
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
