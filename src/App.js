import './App.css'
import { NavBar } from './components/NavBar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'
import { HomePage, CartPage, AccountPage, RegistrationPage } from './pages/'
import { DBProvider } from './components'
import { DatabaseExamplePage } from './pages/DatabaseExamplePage'
import { FiChevronRight } from 'react-icons/fi'
import { useEffect, useState } from 'react'

const Pages = () => {
  const location = useLocation()

  const [showDbLink, setShowDbLink] = useState(true)
  useEffect(() => {
    setShowDbLink(location.pathname === '/db-example')
  }, [location.pathname, setShowDbLink])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/db-example" element={<DatabaseExamplePage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
      <Link
        to="db-example"
        className="DB-Example-Link"
        style={{
          display: showDbLink ? 'none' : 'flex',
        }}
      >
        <p>Database Example</p>
        <FiChevronRight size={16} />
      </Link>
    </>
  )
}

function App() {
  return (
    <DBProvider>
      <Router>
        <Pages />
      </Router>
    </DBProvider>
  )
}

export default App
