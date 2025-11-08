// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProducts";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.price}</td>
                <td className="border p-2">{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;