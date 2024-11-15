import { orderFormData } from "../../pages/Checkout";
import { ActionsType } from "./actions";

export interface CoffeeOrder {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  created?: Date;
}

export interface Item {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

export interface Order extends orderFormData {
  id: number
  items: Item[]
}

interface CartState {
  coffees: CoffeeOrder[]
  order: Order[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cartReducer(state: CartState, action: any): CartState {
  switch (action.type) {
    case ActionsType.ADD_COFFEE_IN_CART: {
      const existingCoffeeIndex = state.coffees.findIndex(
        (coffee) => coffee.id === action.payload.coffee.id
      );

      if (existingCoffeeIndex >= 0) {
        // Update the existing coffee item by merging the new values
        const updatedCoffees = state.coffees.map((coffee, index) =>
          index === existingCoffeeIndex
            ? { ...coffee, quantity: coffee.quantity + action.payload.coffee.quantity }
            : coffee
        );

        return {
          ...state,
          coffees: updatedCoffees,
        };
      } else {
        // Add the new coffee item if it doesn’t exist
        return {
          ...state,
          coffees: [...state.coffees, action.payload.coffee],
        };
      }
    }
    case ActionsType.ADD_COFFEE_QUANTITY_IN_CART: {
      const updatedCoffees = state.coffees.map((coffee) =>
        coffee.id === action.payload.coffeeId
          ? { ...coffee, quantity: coffee.quantity + 1 }
          : coffee
      );

      return {
        ...state,
        coffees: updatedCoffees,
      };
    }
    case ActionsType.SUBTRACT_COFFEE_QUANTITY_IN_CART: {
      const updatedCoffees = state.coffees.map((coffee) =>
        coffee.id === action.payload.coffeeId
          ? { ...coffee, quantity: coffee.quantity - 1 }
          : coffee
      );

      return {
        ...state,
        coffees: updatedCoffees,
      };
    }
    case ActionsType.REMOVE_COFFEE_IN_CART: {
      const updatedCoffees = state.coffees.filter(
        (coffee) => coffee.id !== action.payload.coffeeId
      );

      return {
        ...state,
        coffees: updatedCoffees,
      };
    }
    case ActionsType.CHECKOUT: {
      return { 
        ...state, 
        order: [...state.order, action.payload.order],
        coffees: []
      }
    }
      
    default:
      return state;
  }
}