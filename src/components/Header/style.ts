import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 6.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  nav div {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    padding: 0.5rem;
    background-color: ${(props) => props.theme["purple-light"]};
    border-radius: 0.375rem;

    font-size: 0.875rem;
    color: ${(props) => props.theme["purple-dark"]};
    
    & > :first-child {
      color: ${(props) => props.theme.purple};
    }
  }

  nav a {
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 2.375rem;
    height: 2.375rem;

    color: ${(props) => props.theme["yellow-dark"]};
    background-color: ${(props) => props.theme["yellow-light"]};
    border-radius: 0.375rem;
  }

`