import { orderFormData } from "../../pages/Checkout";
import { CoffeeOrder } from "./reducer";


export enum ActionsType {
  ADD_COFFEE_IN_CART = 'ADD_COFFEE_IN_CART',
  ADD_COFFEE_QUANTITY_IN_CART = 'ADD_COFFEE_QUANTITY_IN_CART',
  SUBTRACT_COFFEE_QUANTITY_IN_CART = 'SUBTRACT_COFFEE_QUANTITY_IN_CART',
  REMOVE_COFFEE_IN_CART = 'REMOVE_COFFEE_IN_CART',
  CHECKOUT = 'CHECKOUT'
}

export function addCoffeeInCartAction(coffee: CoffeeOrder ) {
  return {
    type: ActionsType.ADD_COFFEE_IN_CART,
    payload: {
      coffee
    }
  }
}

export function addCoffeeQuantityInCartAction(coffeeId: number) {
  return {
    type: ActionsType.ADD_COFFEE_QUANTITY_IN_CART,
    payload: {
      coffeeId
    }
  }
}

export function subtractCoffeeQuantityInCartAction(coffeeId: number) {
  return {
    type: ActionsType.SUBTRACT_COFFEE_QUANTITY_IN_CART,
    payload: {
      coffeeId
    }
  }
}

export function removeCoffeeInCartAction(coffeeId: number) {
  return {
    type: ActionsType.REMOVE_COFFEE_IN_CART,
    payload: {
      coffeeId
    }
  }
}

export function checkoutAction(order: orderFormData) {
  return {
    type: ActionsType.CHECKOUT,
    payload: {
      order
    }
  }
} 