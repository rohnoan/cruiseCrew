import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import NavbarMenu from './components/NavbarMenu'
import Wrong from './pages/Wrong';
import Footer from './components/Footer'
//ffffff
//5b1e1e
//b1624e
//a2c3b6
//313e56


export default function App() {
  return (
    <>
      <NavbarMenu />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Wrong/>}/>
      </Routes>
      <Footer/>
    </>
    
  )
}
