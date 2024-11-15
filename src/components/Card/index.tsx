import { ShoppingCart } from "phosphor-react"
import { CoffeeImg, Container, Control, Description, Order, Price, Tags, Title } from "./style"
import { useTheme } from "styled-components"
import { useContext, useState } from "react"
import { CartContext } from "../../contexts/CartContext"
import { QuantityInput } from "../Form/QuantityInput"

type Props = {
  coffee: {
    id: number
    title: string
    description: string
    tags: string[]
    price: number
    image: string
  }
}

export function Card({ coffee }: Props ) {
  const theme = useTheme()
  const { addCoffeeInCart } = useContext(CartContext)

  const [quantity, setQuantity] = useState(1);

  function addItemQuantity() {
    setQuantity((state) => state + 1)
  }

  function subtractItemQuantity() {
    setQuantity((state) => (state > 1 ? state - 1 : state))
  }

  function handleAddCoffeeInCart() {
    addCoffeeInCart({
      id: coffee.id,
      title: coffee.title,
      price: coffee.price,
      image: coffee.image,
      quantity: quantity
    })
  }

  return(
    <Container>
      <CoffeeImg src={coffee.image} alt={coffee.title}/>

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span>
        </Price>

        <Order>
          <QuantityInput 
            quantity={quantity}
            decrementQuantity={subtractItemQuantity}
            incrementQuantity={addItemQuantity}
          >
          </QuantityInput>

          <button onClick={handleAddCoffeeInCart}>
          <ShoppingCart size={22} color={theme["base-card"]} />
          </button>

        </Order>

        
        
      </Control>
    </Container>
  )
}