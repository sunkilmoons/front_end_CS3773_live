import { Cart } from './Cart'
import { ALL_INITIAL_ITEMS } from './initialItems'

export const initialAppState = {
  items: ALL_INITIAL_ITEMS,
  users: [
    {
      username: 'test_user',
      password: 'password',
      cart: new Cart(12345, []),
    },
  ],
  loggedInUser: null,
  errorMessage: null,
  couponCodes: [
    {
      code: 'OOOOOOO',
      discount: 0.5, // percent discount
    },
    {
      code: 'HHHHHHH',
      discount: 0.15, // percent discount
    },
    {
      code: '5555555',
      discount: 0.05, // percent discount
    },
    {
      code: '7777777',
<<<<<<< HEAD
      discount: 1, // percent discount
=======
      discount: 100, // percent discount
>>>>>>> cassidy
    },
  ],
}
