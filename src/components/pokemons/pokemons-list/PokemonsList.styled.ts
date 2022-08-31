import styled from "styled-components";

export const PokemonsListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  background-color: #efefef;
  .pokemons {
    width: 100%;
    max-width: 768px;
    margin: 3rem 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    div {
      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .load-more {
    width: 200px;
    height: 50px;
    margin-bottom: 2rem;
    border-radius: 10px;
    background-color: green;
    color: white;
    font-size: 20px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
`;

export const PokemonsListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 500px;
  padding: 2rem;
  box-shadow: 2px 2px 20px 2px #878383;
  > a {
    margin-top: 24px;
    font-weight: 800;
    font-size: 30px;
    transition: 0.3s;
    text-decoration: none;
    color: black;
    &:hover {
      cursor: pointer;
      color: blueviolet;
    }
  }
  > h1 {
    text-align: center;
    color: red;
  }
  > img {
    width: 70%;
    height: 80%;
  }
`;
