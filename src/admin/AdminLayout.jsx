import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminLock from "./AdminLock";

export default function AdminLayout() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const hasAccess = localStorage.getItem("adminAccess") === "true";
    setUnlocked(hasAccess);
  }, []);

  if (!unlocked) {
    return <AdminLock onUnlock={setUnlocked} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f1f3" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#303e4c",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>
        <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/add-product" style={linkStyle}>Add Product</Link>
        <Link to="/admin/manage-products" style={linkStyle}>Manage Products</Link>
        <Link to="/admin/orders" style={linkStyle}>Orders</Link>
        <button
          onClick={() => {
            localStorage.removeItem("adminAccess");
            window.location.reload();
          }}
          style={{
            marginTop: "auto",
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Lock
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};
