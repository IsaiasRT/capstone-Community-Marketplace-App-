import { Routes, Route } from 'react-router'
import Nav from './components/Nav.jsx'
import ProductList from './components/ProductList.jsx'
import Seller from './components/Seller.jsx'
import MyListings from './components/MyListings.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/my-listings" element={<MyListings />} />
        </Routes>
      </main>
    </>
  )
}
