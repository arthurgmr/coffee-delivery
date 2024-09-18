import { HeaderContainer } from "./style";

import logo from '../../assets/logo.svg'
import { MapPin, ShoppingCart } from "phosphor-react";
import { NavLink } from "react-router-dom";



export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />

      <nav>
        <div>
          <MapPin size={24} weight="fill"/>
          <p>Porto Alegre, RS</p>
        </div>
        
        <NavLink to="/" title="Shopping Cart">
          <ShoppingCart weight="fill" />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}