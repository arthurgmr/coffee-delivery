import { Fragment, useContext } from 'react'
import { Bank, CreditCard, CurrencyDollar, MapPin, Money, Trash } from "phosphor-react"
import { AddressContainer, AddressForm, AddressHeading, CartTotal, CartTotalInfo, CheckoutButton, Coffee, CoffeeInfo, Container, InfoContainer, PaymentContainer, PaymentErrorMessage, PaymentHeading, PaymentOptions } from "./styles"
import { TextInput } from "../../components/Form/TextInput"
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from "react-hook-form"
import { Radio } from "../../components/Form/Radio"
import { QuantityInput } from '../../components/Form/QuantityInput'
import { CartContext } from '../../contexts/CartContext'
import { useNavigate } from 'react-router-dom'
import { Order } from '../../reducers/cart/reducer'

type FormInputs = {
  cep: number
  street: string
  number: string
  fullAddress: string
  neighborhood: string
  city: string
  state: string
  paymentMethod: 'credit' | 'debit' | 'cash'
}

const orderFormSchema = zod.object({
  cep: zod.number({ invalid_type_error: 'Provide a valid CEP' }),
  street: zod.string().min(1, 'Provide a valid street'),
  number: zod.string().min(1, 'Provide a valid number'),
  fullAddress: zod.string(),
  neighborhood: zod.string().min(1, 'Provide a valid neighborhood'),
  city: zod.string().min(1, 'Provide a valid city'),
  state: zod.string().min(1, 'Provide a valid state'),
  paymentMethod: zod.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Select a payment method',
  }),
});

export type orderFormData = zod.infer<typeof orderFormSchema>

export function Checkout() {

  const { 
    coffees, 
    addCoffeeQuantity, 
    subtractCoffeeQuantity, 
    removeCoffee, 
    deliveryPrice, 
    totalItemsPrice,
    checkout
  } = useContext(CartContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<orderFormData>({
    resolver: zodResolver(orderFormSchema)
  })

  const selectedPaymentMethod = watch('paymentMethod')

  function handleAddCoffeeQuantity(coffeeId: number) {
    addCoffeeQuantity(coffeeId)
  }

  function handleSubtractCoffeeQuantity(coffeeId: number) {
    subtractCoffeeQuantity(coffeeId)
  }

  function handleCoffeeRemove(coffeeId: number) {
    removeCoffee(coffeeId)
  }

  const navigate = useNavigate()
  const handleCheckout: SubmitHandler<FormInputs> = (data) => { 
    if (coffees.length === 0) {
      return alert('Add at least one coffee to your order')
    }
    const newOrder: Order = {
      id: new Date().getTime(),
      ...data,
      items: coffees
    }

    checkout(newOrder)
    navigate(`/confirmation/${newOrder.id}`)
  }
  
  return (
    <Container>
      <InfoContainer>
        <h2>Complet your order</h2>

        <form id="order" onSubmit={handleSubmit(handleCheckout)}>
          <AddressContainer>
            <AddressHeading>
              <MapPin size={22} />

              <div>
                <span>Delivery Address</span>

                <p>Provide the address where you would like to receive your order.</p>
              </div>
            </AddressHeading>

            <AddressForm>
              <TextInput
                placeholder="CEP"
                type="number"
                containerProps={{ style: { gridArea: 'cep' } }}
                error={errors.cep}
                {...register('cep', { valueAsNumber: true })}
              />

              <TextInput
                placeholder="Street"
                containerProps={{ style: { gridArea: 'street' } }}
                error={errors.street}
                {...register('street')}
              />

              <TextInput
                placeholder="Number"
                containerProps={{ style: { gridArea: 'number' } }}
                error={errors.number}
                {...register('number')}
              />

              <TextInput
                placeholder="Complement"
                optional
                containerProps={{ style: { gridArea: 'fullAddress' } }}
                error={errors.fullAddress}
                {...register('fullAddress')}
              />

              <TextInput
                placeholder="Neighborhood"
                containerProps={{ style: { gridArea: 'neighborhood' } }}
                error={errors.neighborhood}
                {...register('neighborhood')}
              />

              <TextInput
                placeholder="City"
                containerProps={{ style: { gridArea: 'city' } }}
                error={errors.city}
                {...register('city')}
              />

              <TextInput
                placeholder="St"
                maxLength={2}
                containerProps={{ style: { gridArea: 'state' } }}
                error={errors.state}
                {...register('state')}
              />
            </AddressForm>
          </AddressContainer>

          <PaymentContainer>
            <PaymentHeading>
              <CurrencyDollar size={22} />

              <div>
                <span>Payment</span>

                <p>
                The payment is made at the time of delivery. Choose the payment method you prefer.
                </p>
              </div>
            </PaymentHeading>

            <PaymentOptions>
              <div>
                <Radio
                  isSelected={selectedPaymentMethod === 'credit'}
                  {...register('paymentMethod')}
                  value="credit"
                >
                  <CreditCard size={16} />
                  <span>Credit Card</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'debit'}
                  {...register('paymentMethod')}
                  value="debit"
                >
                  <Bank size={16} />
                  <span>Debit card</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'cash'}
                  {...register('paymentMethod')}
                  value="cash"
                >
                  <Money size={16} />
                  <span>Cash</span>
                </Radio>
              </div>

              {errors.paymentMethod ? (
                <PaymentErrorMessage role="alert">
                  {errors.paymentMethod.message}
                </PaymentErrorMessage>
              ) : null}
            </PaymentOptions>
          </PaymentContainer>
        </form>
      </InfoContainer>

      <InfoContainer>
        <h2>Coffees Selected</h2>

        <CartTotal>
          {coffees.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleAddCoffeeQuantity(coffee.id)}
                        decrementQuantity={() => handleSubtractCoffeeQuantity(coffee.id)}
                      />

                      <button onClick={() => handleCoffeeRemove(coffee.id)}>
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>R$ {coffee.price?.toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(deliveryPrice)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice + deliveryPrice)}
              </span>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            Confirmar pedido
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  )
}