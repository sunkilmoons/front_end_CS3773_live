import './App.css'
import { NavBar } from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, CartPage, AccountPage, RegistrationPage} from './pages/'
import { DBProvider } from './components'
import { DatabaseExamplePage } from './pages/DatabaseExamplePage'


function App() {
  return (
    <DBProvider>
      <Router style={{ width: '100vw', height: '100vh' }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/db-example" element={<DatabaseExamplePage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </DBProvider>
  )
}

export default App
