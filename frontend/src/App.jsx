import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Componentes
import Header from './components/Header'
import Home from './components/Home'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App

