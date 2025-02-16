import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Bike from "./pages/Bike";
import Accessories from "./pages/Accessories";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function App() {
  return (
    <>
      {/* Navbar */}
      
      <div className="">
      <Navbar/>

      </div>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Bike />} />
        <Route path="/bikes" element={<Bike />} />

        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <div>
        <Footer/>
      </div>
    </>
  );
}
