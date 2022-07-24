import home from '../assets/home.svg'
import Search from './search'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import person from '../assets/person.svg'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'
var size='50px'

export const NavBar = () => {
  return (
    <nav className="NavBar">
      
      <Link to="/" style={{ height: '100%',fontSize:'48px',font:'Times New Roman'}}>
        <img src={home} alt={home} style={{ height: '100%',
          // height:size,
          // width:size,
          backgroundColor: 'white',
          borderRadius: '10px' }} />
          
      </Link>

      <div>
        <Link to="/cart">
          <AiOutlineShoppingCart size={40} style={{ cursor: 'pointer',
            color: 'black',
            backgroundColor:'white',
            borderRadius:'10px'}} />
        </Link>
      </div>
      <div class="dropdown-menu">
          <Link to="/account">
            <img src={person} alt={person} style={
              { cursor: 'pointer',
                backgroundColor: 'white',
                borderRadius: '20px'}} />
                

          </Link>
          <Search/>
      </div>
    
     
    </nav>
  )
}
