import { useState } from 'react'
import { useDatabase } from '../hooks/useDatabase'
import '../styles/DBExamplePage.css'
import { Cart } from '../model'

export const DatabaseExamplePage = () => {
  const [state, dispatch] = useDatabase()
  return (
    <div className="db-page">
      <div className="db-left">
        <h1>Use Database Example</h1>
        <p>{`This will show you how to use the database hook.

It contains the state for the entire app and handles all state changes. You'll need to import it like so:
        `}</p>
        <CodeBlock>{`import { useDatabase } from '../path/to/hooks'`}</CodeBlock>
        <p>
          Then you can access the state object and dispatch function in any
          react component with in the app:
        </p>
        <CodeBlock>{`export const MyComponent = () => {

    const [state, dispatch] = useDatabase()

    return <div>Hello World</div>
}`}</CodeBlock>
        <h2>Actions</h2>
        <Header>Sign Up</Header>
        <UsernamePasswordForm
          text="Here you can manipulate the state with a sign up dispatch call, which looks like this. Any error message will be available in 'state.errorMessage'. Sign up or login will update 'state.loggedInUser'"
          error={state.errorMessage}
          code={({ username, password }) =>
            `dispatch({ 
    type: 'sign up', payload: { 
        username: '${username}', 
        password: '${password}' 
    }
})`
          }
          callDispatch={(payload) => dispatch({ type: 'sign up', payload })}
        />
        <Header>Login</Header>
        <UsernamePasswordForm
          text="Here you can manipulate the state with a login dispatch call, which looks like this. Any error message will be available in 'state.errorMessage'. Sign up or login will update 'state.loggedInUser'"
          error={state.errorMessage}
          code={({ username, password }) =>
            `dispatch({ 
    type: 'login', payload: { 
        username: '${username}', 
        password: '${password}' 
    }
})`
          }
          callDispatch={(payload) => dispatch({ type: 'login', payload })}
        />
        <Header>Sign Out</Header>
        <ButtonExample
          state={state}
          text="Here's a sign out call. This will set 'state.loggedInUser' to null."
          code={`dispatch({ type: 'sign out' })`}
          callDispatch={() => dispatch({ type: 'sign out' })}
        />
        <Header>Add Item</Header>
        <ButtonExample
          state={state}
          text="Here's an add item call. This will add an item to the loggedInUser's cart. Make sure the item you add is also in the 'state.items' array or it will mess up the stock count."
          code={`dispatch({ 
            type: 'add item', 
            payload: {
              item: {
                name: 'Apple',
                description: 'A delicious fruit',
                price: 4,
                stockCount: 15,
              },
            } 
          })`}
          callDispatch={() =>
            dispatch({
              type: 'add item',
              payload: {
                item: {
                  name: 'Apple',
                  description: 'A delicious fruit',
                  price: 4,
                  stockCount: 15,
                },
              },
            })
          }
        />
        <Header>Remove Item</Header>
        <ButtonExample
          state={state}
          text="Here's a remove item call. This will remove an item from the loggedInUser's cart."
          code={`dispatch({ 
            type: 'remove item', 
            payload: {
              item: {
                name: 'Apple',
                description: 'A delicious fruit',
                price: 4,
                stockCount: 15,
              },
            } 
          })`}
          callDispatch={() =>
            dispatch({
              type: 'remove item',
              payload: {
                item: {
                  name: 'Apple',
                  description: 'A delicious fruit',
                  price: 4,
                  stockCount: 15,
                },
              },
            })
          }
        />
        <Header>Apply Coupon</Header>
        <ButtonExample
          state={state}
          text="Here's how to apply a coupon. This will add the coupon to the current user's cart."
          code={`dispatch({ type: 'apply coupon',
           payload: {
              couponCode: 'OOOOOOO'
          }
         })`}
          callDispatch={() =>
            dispatch({
              type: 'apply coupon',
              payload: {
                couponCode: 'OOOOOOO',
              },
            })
          }
        />
        <Header>Checkout</Header>
        <ButtonExample
          state={state}
          text="Here's how to checkout. This will decrement the stock count of items and clear the users cart. Don't let the user add more of an item than is in stock to their cart. This function isn't able to handle that error."
          code={`dispatch({ type: 'checkout' })`}
          callDispatch={() => dispatch({ type: 'checkout' })}
        />
        <Header>Clear Cart</Header>
        <ButtonExample
          state={state}
          text="Here's a clear cart call. This will remove all items from the user's cart."
          code={`dispatch({ type: 'clear cart' })`}
          callDispatch={() => dispatch({ type: 'clear cart' })}
        />
        <Header>Cart Functions</Header>
        <p>
          The 'Cart' object has a few static functions you can call to get sales
          tax and total. Add an item or two to see a change.
        </p>
        <CodeBlock>
          Cart.getSalesTax(state.loggedInUser.cart) = $
          {Cart.getSalesTax(state.loggedInUser.cart)}
        </CodeBlock>
        <div style={{ height: '20px' }} />
        <CodeBlock>
          Cart.getSubtotal(state.loggedInUser.cart) = $
          {Cart.getSubtotal(state.loggedInUser.cart)}
        </CodeBlock>
        <div style={{ height: '20px' }} />
        <CodeBlock>
          Cart.getTotal(state.loggedInUser.cart) = $
          {Cart.getTotal(state.loggedInUser.cart)}
        </CodeBlock>
      </div>
      <div className="db-right">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <h2>App State</h2>
          <button
            style={{
              height: 'fit-content',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '1rem',
              fontWeight: 700,
              border: 'none',
              color: 'rgba(225, 0, 50, 1)',
              padding: '8px',
              cursor: 'pointer',
            }}
            onClick={() => dispatch({ type: 'reset db' })}
          >
            reset database
          </button>
        </div>
        <p>
          This is what the 'state' object looks like. When you call the dispatch
          function the state will change.
        </p>
        <p>
          The items array will never change. It contains all items that we sell
          which can be changed in 'src/model/initialItems.js'. After checkout,
          each item's stockCount will decrement by the number of that item
          purchased.
        </p>
        <p>
          The users array contains all the users that have created an account
          and their individual carts.
        </p>
        <p>
          The coupon codes array never changes, if the user enters the correct
          coupon code, the coupon will be added to their cart and the discount
          automatically applies.
        </p>
        <CodeBlock styles="db-sticky">
          {JSON.stringify(state, null, 8)}
        </CodeBlock>
      </div>
    </div>
  )
}

const Header = ({ children }) => {
  return (
    <>
      <div style={{ height: '20px' }} />
      <h4>{children}</h4>
    </>
  )
}

export const CodeBlock = ({ styles, children }) => {
  return (
    <div className={`code-block-container ${styles || ''}`}>
      <p style={{ whiteSpace: 'pre' }}>{children}</p>
    </div>
  )
}

const ButtonExample = ({ text, code, callDispatch, state }) => {
  const [update, didUpdate] = useState(false)

  const submit = () => {
    callDispatch()
    didUpdate(true)
  }

  return (
    <div>
      <p>{text}</p>
      {update && (
        <h3>{'State updated! 🎉 Look to your right for changes 👉'}</h3>
      )}
      <p>
        state.errorMessage ={' '}
        {state.errorMessage ? `"${state.errorMessage}"` : 'null'}
      </p>
      <CodeBlock>{code}</CodeBlock>
      <button style={{ marginTop: '8px' }} onClick={() => submit()}>
        call dispatch
      </button>
    </div>
  )
}

export const UsernamePasswordForm = ({ text, code, callDispatch, error }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [update, didUpdate] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      didUpdate(false)
      return
    }
    callDispatch({ username, password })
    setUsername('')
    setPassword('')
    didUpdate(true)
  }

  return (
    <div>
      <p>{text}</p>
      {update && (
        <h3>{'State updated! 🎉 Look to your right for changes 👉'}</h3>
      )}
      <p>state.errorMessage = {error ? `"${error}"` : 'null'}</p>
      <CodeBlock>{code({ username, password })}</CodeBlock>
      <form style={{ marginTop: '16px' }} onSubmit={(e) => submit(e)}>
        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button name="submit">call dispatch</button>
      </form>
    </div>
  )
}
