import logo from '../assets/logo.svg'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className="NavBar">
      <Link to="/" style={{ height: '100%' }}>
        <img src={logo} alt={logo} style={{ height: '100%' }} />
      </Link>
      <div>
        <Link to="/cart">
          <AiOutlineShoppingCart size={40} style={{ cursor: 'pointer' }} />
        </Link>
      </div>
      <div>
          <Link to="/account">
            <AiOutlineShoppingCart size={40} style={{ cursor: 'pointer' }} />
          </Link>
      </div>
    </nav>
  )
}
