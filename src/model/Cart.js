import { SALES_TAX_PERCENT } from './constants'

export class Cart {
  constructor(id, items) {
    this.id = id
    this.items = items || []
    this.coupon = null
  }

  /**
   * @returns The total sales tax of all items in cart
   */
  static getSalesTax(cart) {
    if (!cart) return 0
    return cart.items
      .map((i) => i.price)
      .reduce((prev, curr) => prev + curr * SALES_TAX_PERCENT, 0)
  }

  /**
   * @returns The total of all items
   */
  static getSubtotal(cart) {
    if (!cart) return 0
    return cart.items.map((i) => i.price).reduce((prev, curr) => prev + curr, 0)
  }

  /**
   * @returns The total of items with sales tax and coupon discount applied
   */
  static getTotal(cart) {
    if (!cart) return 0
    let total = cart.items
      .map((i) => i.price + i.price * SALES_TAX_PERCENT)
      .reduce((p, c) => p + c, 0)
    if (cart.coupon) total = total - total * cart.coupon.discount
    return total
  }
}
