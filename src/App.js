import { Route, Routes } from "react-router-dom";
import Address from "./pages/Address";
import Cart from "./pages/Cart";
import ChangeAvatar from "./pages/ChangeAvatar";
import ChangePassword from "./pages/ChangePassword";
import ChangeProfile from "./pages/ChangeProfile";
import CheckOut from "./pages/CheckOut";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import OrderId from "./pages/OrderId";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import {ProtectedRoute} from "../src/provider/protected-route"
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login"  element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/address" element={<ProtectedRoute><Address /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckOut /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/setting/changeProfile" element={<ProtectedRoute><ChangeProfile /></ProtectedRoute>} />
        <Route path="/setting/changePassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        <Route path="/setting/changeAvatar" element={<ProtectedRoute><ChangeAvatar /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/orders/:orderId" element={<ProtectedRoute><OrderId /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
