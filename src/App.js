import './App.css'
import { NavBar } from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, CartPage } from './pages/'

function App() {
  return (
    <Router style={{ width: '100vw', height: '100vh' }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  )
}

export default App
