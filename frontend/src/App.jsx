import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import OrderScreen from "./components/screens/orderScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import LoginScreen from "./components/screens/LoginScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import Home from "./components/screens/Home";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import "./App.css";

// Define theme (or use default)


function App() {
  return (
      <BrowserRouter>
        <Header />
        <main className="app-content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
  );
}

export default App;