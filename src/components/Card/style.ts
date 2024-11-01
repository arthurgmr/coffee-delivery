import styled from "styled-components";
import { mixins } from "../../styles/mixins";


export const Container = styled.div`
  background-color: ${(props) => props.theme["base-card"]};
  padding: 0 20px 20px;
  border-radius: 6px 36px;
  width: 256px;

  display: flex;
  flex-direction: column;

  text-align: center;
`

export const CoffeeImg = styled.img`
  margin-top: -20px;
  max-width: 120px;
  max-height: 120px;
  align-self: center;
`

export const Tags = styled.div`
  margin-top: 12px;

  display: flex;
  align-items: center;
  align-self: center;
  gap: 4px;

  span {
    padding: 4px 8px;
    border-radius: 100px;
    background-color: ${(props) => props.theme["yellow-light"]};
    color: ${(props) => props.theme["yellow-dark"]};
    text-transform: uppercase;
    ${mixins.fonts.tag}
  }
`

export const Title = styled.h3`
  margin-top: 16px;

  color: ${(props) => props.theme["base-subtitle"]}
  ${mixins.fonts.titleS}
`

export const Description = styled.span`
  margin-top: 8px;
  width: 100%;

  color: ${(props) => props.theme["base-label"]}
  ${mixins.fonts.textS}
`

export const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 32px;
`

export const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;

  span:first-child {
    ${mixins.fonts.textS};
    color: ${(props) => props.theme["base-text"]}
  }

  span:last-child {
    ${mixins.fonts.titleM};
    color: ${(props) => props.theme["base-text"]}
  }
`

/* export const Order = styled.div<{ $itemAdded?: boolean }>` */
export const Order = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > button {
    background-color: ${(props) => props.theme["purple-dark"]};
    transition: background-color 0.2s;
    border-radius: 6px;
    padding: 8px;
    display: flex;

    &:hover {
      background-color: ${(props) => props.theme.purple};
    }
  }
`

export const Quantity = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme["base-button"]};
  border-radius: 6px;

  display: flex;              
  gap: 4px;

  button {
    background-color: transparent;
    display: flex;
    align-items: center;
  }

  button svg {
    color: ${(props) => props.theme.purple};

    transition: all 0.2s;

    &:hover {
      color: ${(props) => props.theme["purple-dark"]};
    }
  }

  span {
    padding-top: 2px;
    color: ${(props) => props.theme["base-title"]};
  }
`