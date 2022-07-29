import { useState } from 'react'
import { useDatabase } from '../hooks/useDatabase'
import { Cart } from '../model'
import '../styles/CartPage.css'

function Coupon(defaultValue) {
  const [code, setCode] = useState(defaultValue);
  function onChange(e) {
    setCode(e.target.value);
  }
  return {
    code,
    onChange,
  };
}


export const CartPage = () => {
  const [state, dispatch] = useDatabase()
  const coupon = Coupon();
  return (
    <div className="Cart">
      <div className='cart-header'>
      <h1
        style={{
          flex: 1,
          color: 'Black',
          textAlign: 'center',
        }}>
        {state.loggedInUser?.username} Shopping Cart:
      </h1>
      </div>
      <div className='cart-list'>
      <p
      style={{
        flex: 1,
        color: 'Black',
        textAlign: 'center',
      }}>
        {state.loggedInUser?.cart.items.map((item) => 
        (
          <div className='itemListing' key={item.index}>
            <p>Item:  {item.name}  Cost: {item.price}</p>
            <button onClick={() =>
            dispatch({
              type: 'remove item',
              payload: {
                item: {
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  stockCount: item.stockCount,
                },
              },
            })}
            style={{
              flex: 1,
              color: 'Black',
              textAlign: 'center',
            }}>
              remove
            </button>
          </div>
        )
        )}
      </p>
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
    <div className='ButtonBar'>
    <button onClick={() => dispatch({ type: 'clear cart' })}
    style={{color: 'Black', padding: 17, alignSelf: 'left'}}>Clear Cart</button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button onClick={() => dispatch({ type: 'checkout' })}
    style={{color: 'Black', padding: 17, alignSelf: 'center'}}>Checkout</button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <div class="Search">  
    <input input {...coupon} placeholder="Enter Coupon Code"/>
    <button onClick={() =>
            dispatch({
              type: 'apply coupon',
              payload: {
                couponCode: coupon.code,
              },
            })}>Apply</button> 
    </div>

    </div>

    </div>
  
  )
}
