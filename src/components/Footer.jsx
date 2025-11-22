export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1rem",
        background: "#f5f5f5",
        marginTop: "2rem",
      }}
    >
      <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
    </footer>
  );
}
