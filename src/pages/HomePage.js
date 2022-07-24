import { useState } from 'react'
import pic from '../assets/plus_sign.png'
import { useDatabase, useLoginWithTestUser } from '../hooks'

export const HomePage = () => {
  const [state, dispatch] = useDatabase()

  const [searchText, setSearchText] = useState('')

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
          color: 'white',
        }}
      >
        Items For Sale
      </h2>
      {/* <input
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="search"
      /> */}
      <ul
        style={{
          flex: 0,
          flexWrap: 'wrap',
          textAlign: 'center',
          alignSelf: 'center',
        }}
      >
        {state.items
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
