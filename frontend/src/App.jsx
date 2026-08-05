import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Nav from './components/Nav.jsx'
import ProductList from './components/ProductList.jsx'
import Seller from './components/Seller.jsx'
import MyListings from './components/MyListings.jsx'
import Cart from './components/Cart.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product._id === product._id)
      if (existing) {
        return current.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((current) =>
      current.filter((item) => item.product._id !== productId)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <>
      <Nav cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <main>
        <Routes>
          <Route path="/" element={<ProductList onAddToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller" element={<ProtectedRoute><Seller /></ProtectedRoute>} />
          <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} onRemove={removeFromCart} onClear={clearCart} />
            }
          />
        </Routes>
      </main>
    </>
  )
}
