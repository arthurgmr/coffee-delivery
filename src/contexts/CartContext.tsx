import { createContext, ReactNode, useReducer } from "react";
import { cartReducer, CoffeeOrder, Order } from "../reducers/cart/reducer";
import { addCoffeeInCartAction, addCoffeeQuantityInCartAction, checkoutAction, removeCoffeeInCartAction, subtractCoffeeQuantityInCartAction } from "../reducers/cart/actions";


interface CartContext {
  coffees: CoffeeOrder[]
  addCoffeeInCart: (data: CoffeeOrder) => void
  addCoffeeQuantity: (coffeeId: number) => void
  subtractCoffeeQuantity: (coffeeId: number) => void
  removeCoffee: (coffeeId: number) => void
  deliveryPrice: number
  totalItemsPrice: number
  checkout: (order: Order) => void
  order: Order[]
}

export const CartContext = createContext({} as CartContext)

interface CartContextProviderProps {
  children: ReactNode
}

const initialState = {
  coffees: [] as CoffeeOrder[],
  order: [] as Order[]
}

export function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(cartReducer, initialState)

  const { coffees, order } = cartState

  function addCoffeeInCart(data: CoffeeOrder) {
    const newCoffeeOrder: CoffeeOrder = {
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.image,
      quantity: data.quantity,
      created: new Date()
    }

    dispatch(addCoffeeInCartAction(newCoffeeOrder))
  }

  function addCoffeeQuantity(coffeeId: number) {
    dispatch(addCoffeeQuantityInCartAction(coffeeId))
  }
  function subtractCoffeeQuantity(coffeeId: number) {
    dispatch(subtractCoffeeQuantityInCartAction(coffeeId))
  }
  function removeCoffee(coffeeId: number) {
    dispatch(removeCoffeeInCartAction(coffeeId))
  }

  function checkout(data: Order) {
    dispatch(checkoutAction(data))
  }

  function getTotalItemsPrice() {
    const total = coffees.reduce((acc, coffee) => {
      return acc + coffee.price * coffee.quantity
    }, 0)

    return total
  }

  const deliveryPrice = 3.5
  const totalItemsPrice = getTotalItemsPrice()

  return (
    <CartContext.Provider 
      value={{
        coffees,
        addCoffeeInCart,
        addCoffeeQuantity,
        subtractCoffeeQuantity,
        removeCoffee,
        deliveryPrice,
        totalItemsPrice,
        checkout,
        order
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
