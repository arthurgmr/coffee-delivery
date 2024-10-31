import { CoffeeImg, Container, Control, Description, Price, Tags, Title } from "./style"

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
        
      </Control>
    </Container>
  )
}