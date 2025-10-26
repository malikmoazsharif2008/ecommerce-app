export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title || "Product"}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h3>{product.title || "Product Name"}</h3>
      <p>${product.price || "0.00"}</p>
    </div>
  );
}
