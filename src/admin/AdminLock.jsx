import React, { useState } from "react";

export default function AdminLock({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = (e) => {
    e.preventDefault();
    // 👇 yahan apna secret code likho
    const correctPassword = "admin@123";

    if (password === correctPassword) {
      localStorage.setItem("adminAccess", "true");
      onUnlock(true);
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#303e4c",
      }}
    >
      <form
        onSubmit={handleUnlock}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🔒 Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin key"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#303e4c",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
