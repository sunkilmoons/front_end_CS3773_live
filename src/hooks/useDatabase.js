import { createContext, useContext, useEffect, useReducer } from 'react'
import { Cart } from '../model/Cart'
import { initialAppState } from '../model/initialAppState'

const REGISTER_ACTION_TYPES = 'login' | 'sign up' | 'sign out'

const CART_MANAGEMENT_ACTION_TYPES =
  'add item' | 'remove item' | 'clear cart' | 'apply coupon' | 'checkout'

const throwInvalidPayload = (actionType, examplePayload) => {
  alert(
    `Error: Wrong payload for action: ${actionType}.\nExample usage: dispatch({ type: '${actionType}', payload: ${JSON.stringify(
      examplePayload,
      null,
      4
    )} })`
  )
}

const reducer = (state, action) => {
  const username = action.payload?.username
  const password = action.payload?.password
  const item = action.payload?.item
  const couponCode = action.payload?.couponCode
  const currentUser = state.loggedInUser
  switch (action.type) {
    case 'login':
      if (state.loggedInUser !== null)
        return {
          ...state,
          errorMessage:
            "You can't log in if there is already a 'state.loggedInUser'. Try a sign out first.",
        }

      if (!username || !password) {
        throwInvalidPayload(action.type, {
          username: 'test_user',
          password: 'my_password',
        })
        return state
      }

      const user = state.users.filter((u) => u.username === username)[0]

      if (!user) return { ...state, errorMessage: 'User not found' }

      if (user.password !== password)
        return { ...state, errorMessage: 'Password is incorrect!' }

      return {
        ...state,
        errorMessage: null,
        loggedInUser: user,
      }

    case 'sign up':
      if (state.loggedInUser !== null)
        return {
          ...state,
          errorMessage:
            "You can't sign up if there is already a 'state.loggedInUser'. Try a sign out first.",
        }

      if (!username || !password) {
        throwInvalidPayload(action.type, {
          username: 'test_user',
          password: 'my_password',
        })
        return state
      }

      if (state.users.filter((u) => u.username === username).length > 0)
        return {
          ...state,
          errorMessage: 'Username taken. Did you forget your password?',
        }

      const newUser = {
        username,
        password,
        cart: new Cart(Math.floor(Math.random() * 10000), []),
      }

      console.log(newUser)

      return {
        ...state,
        errorMessage: null,
        loggedInUser: newUser,
        users: [...state.users, newUser],
      }

    case 'sign out':
      return { ...state, errorMessage: null, loggedInUser: null }

    case 'add item':
      if (!item) {
        throwInvalidPayload(action.type, {
          item: {
            name: 'Apple',
            description: 'A delicious fruit',
            price: 4,
            stockCount: 15,
          },
        })
        return state
      }

      if (!currentUser)
        return {
          ...state,
          errorMessage:
            'User not logged in. You must log in before adding items to your cart.',
        }
      currentUser.cart.items.push(item)

      return {
        ...state,
        errorMessage: null,
        users: [
          ...state.users.map((u) => {
            if (u.username === currentUser.username) return currentUser
            return u
          }),
        ],
      }

    case 'remove item':
      if (!item) {
        throwInvalidPayload(action.type, {
          item: {
            name: 'Apple',
            description: 'A delicious fruit',
            price: 4,
            stockCount: 15,
          },
        })
        return state
      }

      if (!currentUser)
        return {
          ...state,
          errorMessage:
            'User not logged in. You must log in before adding items to your cart.',
        }

      const i = currentUser.cart.items.findIndex((i) => i.name === item.name)
      currentUser.cart.items.splice(i, 1)

      return {
        ...state,
        users: [
          ...state.users.map((u) => {
            if (u.username === currentUser.username) return currentUser
            return u
          }),
        ],
      }

    case 'apply coupon':
      let error = null
      if (!couponCode) currentUser.cart.couponCode = null
      else {
        const code = state.couponCodes.filter((c) => c.code === couponCode)[0]
        currentUser.cart.couponCode = code || null
        if (!code) error = 'Incorrect coupon code!'
      }

      return {
        ...state,
        users: [
          ...state.users.map((u) => {
            if (u.username === currentUser.username) return currentUser
            return u
          }),
        ],
        errorMessage: error,
      }

    case 'checkout':
      let stateItems = [...state.items]

      for (let itm of currentUser.cart.items) {
        stateItems = stateItems.map((i) => {
          if (i.name === itm.name) {
            return { ...i, stockCount: i.stockCount - 1 }
          }
          return i
        })
      }

      currentUser.cart.items = []

      return {
        ...state,
        items: stateItems,
        users: [
          ...state.users.map((u) => {
            if (u.username === currentUser.username) return currentUser
            return u
          }),
        ],
        errorMessage: null,
      }

    case 'clear cart':
      currentUser.cart.items = []

      return {
        ...state,
        users: [
          ...state.users.map((u) => {
            if (u.username === currentUser.username) return currentUser
            return u
          }),
        ],
        errorMessage: null,
      }

    case 'reset db':
      localStorage.clear()
      return initialAppState

    default:
      return state
  }
}

const preActionMiddleware = (state, action) => {
  if ((action.type !== REGISTER_ACTION_TYPES) | CART_MANAGEMENT_ACTION_TYPES) {
    // console.error(
    //   "ERROR: You're not using one of the correct action types!\nExample usage: dispatch({ type: 'log in', payload: { username: 'test_user', password: 'password' }})"
    // )
  }
  if (!action.payload) {
    console.warn(
      "WARNING: 'payload' is null or undefined. Make sure this action does not require a payload."
    )
  }

  console.log(`Sending Action: ${action.type}`)
  console.log(`Current state is:\n${JSON.stringify(state, null, 2)}`)
}

export const DBContext = createContext(undefined)

export const useDBReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialAppState, (initial) => {
    const persisted = JSON.parse(localStorage.getItem('db'))
    return persisted || initial
  })

  const dispatchWithMiddleware = (action) => {
    preActionMiddleware(state, action)
    dispatch(action)
  }
  return [state, dispatchWithMiddleware]
}

export const useDatabase = () => {
  const db = useContext(DBContext)

  if (!db) throw Error('useDatabase must be used in a DBProvider')

  useEffect(() => {
    localStorage.setItem('db', JSON.stringify(db.state))
  }, [db.state])

  return [db.state, db.dispatch]
}
