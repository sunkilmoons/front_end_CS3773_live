import React, { useEffect, useState } from 'react'
import pic from '../assets/plus_sign.png'
import { useDatabase, useLoginWithTestUser } from '../hooks'

const SORT_PRICE = 'price'
const SORT_AVAIL = 'availability'

export const HomePage = () => {
  const [state, dispatch] = useDatabase()

  const [searchText, setSearchText] = useState('')

  const [item_choice, setItem_choice] = useState([])

  const [sortType, setSortType] = useState('')
  const [sortASC, setSortASC] = useState(true)

  // login with test user so we have a cart to work with.
  // until we get the account page setup.
  useLoginWithTestUser()

  const handleClick = (item) => {
    // add item to cart...
    dispatch({ type: 'add item', payload: { item } })

    alert(
      `You clicked item: ${JSON.stringify(
        item,
        null,
        2
      )}\n\nThe previous cart looked like ${JSON.stringify(
        state.loggedInUser?.cart?.items,
        null,
        4
      )}`
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
        return -1

      default:
        return 0
    }
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        //justifyContent: 'space-between',
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
        classname="title for items"
        style={{
          flex: 0,
          textAlign: 'center',
          alignSelf: 'center',
          color: 'blue',
        }}
      >
        Items For Sale
      </h2>
      <input
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="search"
      />
      <button onClick={() => setSortType(SORT_PRICE)}>Sort By Price</button>
      <button onClick={() => setSortType(SORT_AVAIL)}>
        Sort By Availability
      </button>

      <ul
        style={{
          flex: 0,
          flexWrap: 'wrap',
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
                color: 'orange',
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
              <p>{item.description}</p>
              <p>{item.price}</p>
              <p>{item.stockCount}</p>
            </div>
          ))}
      </ul>
    </div>
  )
}
