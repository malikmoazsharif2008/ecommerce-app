import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
<<<<<<< HEAD

=======
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import AdminLayout from "./admin/AdminLayout";
>>>>>>> 7aa063d (Saving my work before pulling latest code)
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import Orders from "./admin/Orders";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
<<<<<<< HEAD
      
=======
        <Route path="/register" element={<Register />} />
>>>>>>> 3b00e40 (Added admin layout and dashboard functionality)
        <Route path="/products" element={<Products />} />
=======
>>>>>>> 7aa063d (Saving my work before pulling latest code)
        

        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
<<<<<<< HEAD
}
=======
}

export default App;
>>>>>>> 7aa063d (Saving my work before pulling latest code)
