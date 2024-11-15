import { useContext } from "react"
import { Container, Heading, Info, InfoContent, Order } from "./style"
import { CurrencyDollar, MapPin, Timer } from "phosphor-react"
import { CartContext } from "../../contexts/CartContext"
import { useTheme } from "styled-components"
import { useParams } from "react-router-dom"

import deliveryBike from '../../assets/delivery.svg'

export function OrderConfirmation() {
  const theme = useTheme()

  const { orderId } = useParams()
  const { order } = useContext(CartContext)
  const orderInfo = order.find((or) => or.id === Number(orderId))

  const paymentMethod = {
    credit: 'Credit Card',
    debit: 'Debit Card',
    cash: 'Cash',
  }

  if (!orderInfo?.id) {
    return null
  }

  return (
    <Container>
      <Order>
        <Heading>
          <h2>Uhuuul! Order Confirmed</h2>
          <span>Now, just wait—your coffee is on its way to you</span>
        </Heading>

        <Info>
          <InfoContent>
            <div>
              <MapPin
                color={theme.white}
                style={{ backgroundColor: theme.purple }}
                size={32}
              />

              <div>
                <span>
                  Delivery to{' '}
                  <strong>
                    {orderInfo.street}, {orderInfo.number}
                  </strong>
                </span>

                <span>
                  {orderInfo.neighborhood} - {orderInfo.city},{orderInfo.state}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.white}
                style={{ backgroundColor: theme.yellow }}
                size={32}
              />

              <div>
                <span>Estimated Delivery Time</span>

                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar
                color={theme["base-card"]}
                style={{ backgroundColor: theme['yellow-dark'] }}
                size={32}
              />

              <div>
                <span>Payment upon delivery</span>

                <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
              </div>
            </div>
          </InfoContent>
        </Info>
      </Order>

      <img src={deliveryBike} alt="Pedido concluído" />
    </Container>
  )
}