import { useState } from 'react'
import { useDatabase } from '../hooks/useDatabase'
import { Cart } from '../model'
import '../styles/CartPage.css'

export const CartPage = () => {
  const [state, dispatch] = useDatabase()

  return (
    <div className="Cart">
      <div className='cart-header'>
      <h1
        style={{
          flex: 1,
          color: 'Black',
          textAlign: 'center',
        }}>
        Your Shopping Cart:
      </h1>
      </div>
      <div className='TotalBar'>
      <p
        style={{color: 'Black', padding: 20, alignSelf: 'left'}}>
          Sub: {Cart.getSubtotal(state.loggedInUser?.cart)}
      </p>
      <p
      style={{color: 'Black', padding: 20, alignSelf: 'center'}}>
        Tax: {Cart.getSalesTax(state.loggedInUser?.cart)}
      </p>
      <p
      style={{color: 'Black', padding: 20, alignSelf: 'right'}}>
        Tot: {Cart.getTotal(state.loggedInUser?.cart)}</p>
    </div>
    </div>
  
  )
}
