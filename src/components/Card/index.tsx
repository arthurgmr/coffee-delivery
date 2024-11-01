import { Minus, Plus, ShoppingCart } from "phosphor-react"
import { CoffeeImg, Container, Control, Description, Order, Price, Quantity, Tags, Title } from "./style"
import { useTheme } from "styled-components"

type Props = {
  coffee: {
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
  }
}

export function Card({ coffee }: Props ) {
  const theme = useTheme()

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
          <Quantity>
            <button>
              <Minus size={14} />
            </button>
            <span>1</span>
            <button>
              <Plus size={14}/>
            </button>
          </Quantity>

          <button>
          <ShoppingCart size={22} color={theme["base-card"]} />
          </button>

        </Order>

        
        
      </Control>
    </Container>
  )
}