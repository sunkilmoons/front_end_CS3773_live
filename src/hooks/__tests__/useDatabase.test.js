import { reducer } from '../useDatabase'
import { initialAppState } from '../../model/initialAppState'
import { ALL_INITIAL_ITEMS } from '../../model/initialItems'
import { Cart } from '../../model/Cart'

it('has initial items after no action', () => {
  const state = reducer(initialAppState, { type: '', payload: {} })

  expect(state.items).toEqual(ALL_INITIAL_ITEMS)
})

it('logs user in with correct password', () => {
  const state = reducer(initialAppState, {
    type: 'login',
    payload: {
      username: 'test_user',
      password: 'password',
    },
  })

  expect(state.loggedInUser).not.toBeNull()
})

it('gives error with incorrect password', () => {
  const state = reducer(initialAppState, {
    type: 'login',
    payload: {
      username: 'test_user',
      password: 'wrong password',
    },
  })

  expect(state.loggedInUser).toBeNull()
  expect(state.errorMessage?.length).toBeGreaterThan(1)
})

it('signs up user', () => {
  const newUser = {
    username: 'new guy',
    password: 'my_secret_password',
  }

  const state = reducer(initialAppState, {
    type: 'sign up',
    payload: newUser,
  })

  expect(state.users.length).toEqual(2) // (2 including test_user)
  expect(state.loggedInUser).not.toBeNull()
})

it('logs out user', () => {
  // given
  const initialState = {
    ...initialAppState,
    loggedInUser: {
      username: 'test_user',
      password: 'password',
      cart: new Cart(12345, []),
    },
  }

  // when
  const state = reducer(initialState, {
    type: 'sign out',
  })

  // then
  expect(state.loggedInUser).toBeNull()
})

it('gives error when username taken', () => {
  const newUser = {
    username: 'new guy',
    password: 'my_secret_password',
  }

  let state = reducer(initialAppState, {
    type: 'sign up',
    payload: newUser,
  })

  state = reducer(state, {
    type: 'sign out',
  })

  state = reducer(state, {
    type: 'sign up',
    payload: newUser,
  })

  expect(state.users.length).toEqual(2) // (2 including test_user)
  expect(state.errorMessage?.length).toBeGreaterThan(1)
})

it('adds item to cart', () => {
  // given
  const initialState = {
    ...initialAppState,
    loggedInUser: {
      username: 'test_user',
      password: 'password',
      cart: new Cart(12345, []),
    },
  }

  // when
  const addedItem = ALL_INITIAL_ITEMS[0]
  const state = reducer(initialState, {
    type: 'add item',
    payload: { item: ALL_INITIAL_ITEMS[0] },
  })

  // then
  expect(state.loggedInUser.cart.items).toEqual([addedItem])
})

it('removes item from cart, but not extras of the same item', () => {
  // given
  const initialState = {
    ...initialAppState,
    loggedInUser: {
      username: 'test_user',
      password: 'password',
      cart: new Cart(12345, [ALL_INITIAL_ITEMS[0], ALL_INITIAL_ITEMS[0]]),
    },
  }

  // when
  const state = reducer(initialState, {
    type: 'remove item',
    payload: { item: ALL_INITIAL_ITEMS[0] },
  })

  // then
  expect(state.loggedInUser.cart.items.length).toEqual(1)
})

it('applies coupon', () => {
  // given
  const initialState = {
    ...initialAppState,
    loggedInUser: {
      username: 'test_user',
      password: 'password',
      cart: new Cart(12345, [ALL_INITIAL_ITEMS[0], ALL_INITIAL_ITEMS[0]]),
    },
  }

  const coupon = initialAppState.couponCodes[0]

  // when
  const state = reducer(initialState, {
    type: 'apply coupon',
    payload: { couponCode: coupon.code },
  })

  const total =
    Cart.getSubtotal(state.loggedInUser.cart) +
    Cart.getSalesTax(state.loggedInUser.cart)

  const discount = coupon.discount

  // then
  expect(state.errorMessage).toBeNull()

  expect(Cart.getTotal(state.loggedInUser.cart)).toEqual(
    total - total * discount
  )
})

it('checks out cart items and decrements their corresponding stock count in the store', () => {
  // given
  const cartFirstItemCount = 5
  const initialState = {
    ...initialAppState,
    loggedInUser: {
      username: 'test_user',
      password: 'password',
      cart: new Cart(
        12345,
        Array(cartFirstItemCount).fill(ALL_INITIAL_ITEMS[0])
      ),
    },
  }

  // when
  const initialStockCountForFirstItem = ALL_INITIAL_ITEMS[0].stockCount
  const state = reducer(initialState, {
    type: 'checkout',
  })

  expect(state.errorMessage).toBeNull()

  expect(state.items[0].stockCount).toEqual(
    initialStockCountForFirstItem - cartFirstItemCount
  )
})
