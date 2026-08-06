import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Nav from './components/Nav.jsx'
import ProductList from './components/ProductList.jsx'
import Seller from './components/Seller.jsx'
import MyListings from './components/MyListings.jsx'
import Cart from './components/Cart.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState(getInitialTheme)

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      return next
    })
  }

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

  const removeQuantity = (productId) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeAllFromCart = (productId) => {
    setCart((current) =>
      current.filter((item) => item.product._id !== productId)
    )
  }

  const clearCart = () => {
    setCart([])
    alert('Thank you for Shopping!')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <Nav cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} theme={theme} onToggleTheme={toggleTheme} />
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
              <Cart cart={cart} onRemove={removeQuantity} onRemoveAll={removeAllFromCart} onClear={clearCart} />
            }
          />
        </Routes>
      </main>
    </>
  )
}
