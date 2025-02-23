import React from "react";
import { Routes, Route } from "react-router-dom";
import Bike from "./pages/Bike";
import Accessories from "./pages/Accessories";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Seller from "./pages/SellerAccount";
import Customer from "./pages/CustomerAccount";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Bike />} />
        <Route path="/bikes" element={<Bike />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Parent Route for Account */}
        <Route path="/account/*" element={<Account />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="*" element={<h1 className="flex align-middle items-center justify-center text-[100px] font-mono">404</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
