import React, { useEffect, useState } from 'react'
import pic from '../assets/plus_sign.png'
import { useDatabase, useLoginWithTestUser } from '../hooks'

const SORT_PRICE = 'price'
const SORT_AVAIL = 'availability'
const SORT_RESET = 'item'

export const HomePage = () => {
  const [state, dispatch] = useDatabase()

  const [searchText, setSearchText] = useState('')

  const [item_choice, setItem_choice] = useState([])

  const [sortType, setSortType] = useState('')
  const [sortASC, setSortASC] = useState(true)

  // login with test user so we have a cart to work with.
  // until we get the account page setup.
  // useLoginWithTestUser()

  const handleClick = (item) => {
    if (!state.loggedInUser) {
      alert('Sign in to add items to your cart!')
      return
    }
    // check that item isn't sold out...
    if (countForItemInCart(item) <= 0) {
      alert(`Sold out of ${item.name}!`)
      return
    }

    // add item to cart...
    dispatch({ type: 'add item', payload: { item } })

    alert(`You added ${item.name} to your cart`)
  }

  const countForItemInCart = (item) => {
    if (!state.loggedInUser) return item.stockCount
    return (
      item.stockCount -
      state.loggedInUser.cart.items.filter((i) => i.name === item.name).length
    )
  }

  /**
   *  Sort functions in js require a number returned
   *  Positive numbers will be positioned last, negative first
   */
  function handleSort(itemA, itemB) {
    switch (sortType) {
      case SORT_PRICE:
        if (sortASC) return itemA.price > itemB.price ? 1 : -1
        else return itemA.price < itemB.price ? 1 : -1

      case SORT_AVAIL:
        // TODO: handle availability here...
        if (sortASC) return itemA.stockCount > itemB.stockCount ? 1 : -1
        else return itemA.stockCount < itemB.stockCount ? 1 : -1

      case SORT_RESET:
        return itemA != itemB ? -1 : 1

      default:
        return 0
    }
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      <h1
        style={{
          flex: 0,
          textAlign: 'center',
          alignSelf: 'center',
          padding: 50,
        }}
      >
        Home
      </h1>

      <h2
        className="title for items"
        style={{
          flex: 0,
          textAlign: 'center',
          alignSelf: 'center',
          color: 'white',
        }}
      >
        Items For Sale
      </h2>
      <input
        style={{ maxWidth: '200px', alignSelf: 'center' }}
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="search"
      />
      <button
        style={{
          margin: 1,
          borderOutline: 1,
          borderRadius: 10,
          width: 100,
          alignSelf: 'center',
        }}
        onClick={() => setSortType(SORT_PRICE)}
      >
        Sort By Price
      </button>
      <button
        style={{
          margin: 1,
          borderOutline: 1,
          borderRadius: 10,
          width: 130,
          alignSelf: 'center',
        }}
        onClick={() => setSortType(SORT_AVAIL)}
      >
        Sort By Availability
      </button>
      <button
        style={{
          margin: 1,
          borderOutline: 1,
          borderRadius: 10,
          width: 130,
          alignSelf: 'center',
        }}
        onClick={() => setSortType(SORT_RESET)}
      >
        No Sort
      </button>

      <ul
        style={{
          flex: 0,
          textAlign: 'center',
          alignSelf: 'center',
        }}
      >
        {state.items
          .sort((a, b) => handleSort(a, b))
          .filter((i) =>
            i.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((item) => (
            <div
              style={{
                flex: 0,
                flexWrap: 'wrap',
                display: 'inline-block',
                margin: 20,
                fontFamily: 'Arial Black',
                fontSize: 18,
                color: 'blue',
              }}
            >
              <h3
                style={{
                  display: 'inline',
                  flexWrap: 'wrap',
                }}
              >
                {item.name}
              </h3>
              <img
                src={pic}
                alt="Add"
                style={{
                  padding: 5,
                  width: '1rem',
                  height: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => handleClick(item)}
              />
              <p>Desc: {item.description}</p>
              <p>${item.price}</p>
              <p>Availability: {countForItemInCart(item)}</p>
            </div>
          ))}
      </ul>
    </div>
  )
}
