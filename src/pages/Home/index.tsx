import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { CoffeeList, Heading, Hero, HeroContent, Info } from "./styles";
import { useTheme } from "styled-components";
import { Card } from "../../components/Card";
import heroLogo from "../../assets/hero-logo.svg";
import heroBg from "../../assets/hero-background.svg";

import { coffees } from '../../../data.json';

export function Home() {
  const theme = useTheme();

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Find a little coffee near you at any time of the day</h1>

              <span>
              With Coffee Delivery you can receive your coffee wherever you are, at
              any time
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme["yellow-dark"]}}
                />
                <span>Simple and security purchase</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme['base-text'] }}
                />
                <span>Packaging keeps coffee intact</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme.yellow }}
                />
                <span>Fast and trackable delivery</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>

          </div>

          <img id="heroLogo" src={heroLogo} alt="Hero Background" />
        </HeroContent>
        <img id="heroBg" src={heroBg} alt="Coffee Delivery logo" />
      </Hero>

      <CoffeeList>
        <h2>Our Coffee</h2>

        <div>
        {coffees.map((coffee) => (
            <Card key={coffee.id} coffee={coffee} />
          ))}
          
        </div>
      </CoffeeList>


    </div>
  )
}