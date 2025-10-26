import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
<<<<<<< HEAD
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import AdminLayout from "./admin/AdminLayout";
=======

>>>>>>> ef21d80f1a0a699f22ad804ef3fb6189f57e378f
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import Orders from "./admin/Orders";
import Products from "./pages/Products"; 

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
=======
      
        <Route path="/products" element={<Products />} />
>>>>>>> ef21d80f1a0a699f22ad804ef3fb6189f57e378f
        

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

export default App;
=======
}
>>>>>>> ef21d80f1a0a699f22ad804ef3fb6189f57e378f
