import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/style.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderPreviewPage from './pages/OrderPreviewPage'
import WarrantyPage from './pages/WarrantyPage'
import ShippingPage from './pages/ShippingPage'
import ReturnsPage from './pages/ReturnsPage'
import SupportPage from './pages/SupportPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-preview" element={<OrderPreviewPage />} />
        <Route path="/garancia" element={<WarrantyPage />} />
        <Route path="/szallitas" element={<ShippingPage />} />
        <Route path="/visszakuldes" element={<ReturnsPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </Router>
  )
}

export default App