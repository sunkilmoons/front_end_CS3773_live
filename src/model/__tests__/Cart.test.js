import { Cart } from '../Cart'
import { SALES_TAX_PERCENT } from '../constants'

// If you change these prices, you will have to change all tests
const items = [
  {
    price: 4.5,
  },
  {
    price: 7,
  },
  {
    price: 2,
  },
]

const cart = new Cart(12345, items)

const coupon = {
  discount: 0.15, // 15% discount
}

it('has correct number of items', () => {
  expect(cart.items.length).toBe(3)
})

it('calculates sales tax', () => {
  const correctSalesTax =
    4.5 * SALES_TAX_PERCENT + 7 * SALES_TAX_PERCENT + 2 * SALES_TAX_PERCENT
  expect(Cart.getSalesTax(cart)).toEqual(correctSalesTax)
})

it('gets subtotal', () => {
  const correctSubtotal = 4.5 + 7 + 2
  expect(Cart.getSubtotal(cart)).toEqual(correctSubtotal)
})

it('gets total without coupon', () => {
  const correctSalesTax =
    4.5 * SALES_TAX_PERCENT + 7 * SALES_TAX_PERCENT + 2 * SALES_TAX_PERCENT
  const correctSubtotal = 4.5 + 7 + 2
  expect(Cart.getTotal(cart)).toEqual(correctSalesTax + correctSubtotal)
})

it('gets total with coupon applied', () => {
  const correctSalesTax =
    4.5 * SALES_TAX_PERCENT + 7 * SALES_TAX_PERCENT + 2 * SALES_TAX_PERCENT
  const correctSubtotal = 4.5 + 7 + 2
  cart.coupon = coupon
  const total = correctSalesTax + correctSubtotal
  const totalMinusDiscount = total - total * coupon.discount
  expect(Cart.getTotal(cart)).toEqual(totalMinusDiscount)
})
