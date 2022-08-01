import Search from './search'
import { AiOutlineShoppingCart, AiFillHome } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import person from '../assets/person.svg'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

export const NavBar = () => {
  return (
    <nav className="NavBar">
      <Link
        to="/"
        style={{ height: '100%', fontSize: '48px', font: 'Times New Roman' }}
      >
        <AiFillHome
          size={40}
          className="hover-item"
          style={{ color: 'black' }}
        />
      </Link>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem' }}>
        <Link to="/cart">
          <AiOutlineShoppingCart
            size={40}
            className="hover-item"
            style={{
              color: 'black',
            }}
          />
        </Link>
        <div class="dropdown-menu">
          <Link to="/account">
            <BsFillPersonFill
              className="hover-item"
              size={40}
              style={{ color: 'black ' }}
            />
          </Link>
          <Search />
        </div>
      </div>
    </nav>
  )
}
