import { Routes, Route } from 'react-router'
import Nav from './components/Nav.jsx'
import ProductList from './components/ProductList.jsx'
import Seller from './components/Seller.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/seller" element={<Seller />} />
        </Routes>
      </main>
    </>
  )
}
