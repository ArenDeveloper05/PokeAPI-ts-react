import styled from "styled-components";

export const SinglePokemonWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://i0.wp.com/www.gamerfocus.co/wp-content/uploads/2019/06/pokemon_collage.jpg?resize=1000%2C600&ssl=1);
  > section {
    width: 40%;
    border: 3px solid;
    border-radius: 30px;
    padding: 1rem;
    display: flex;
    align-items: center;
    background: linear-gradient(#d3a537, #f44336);
    box-shadow: 5px 4px 18px 8px white;
    transition: 0.3s;
    &:hover {
      transform: scale(1.2);
    }
    @media only screen and (max-width: 1200px) {
      & {
        flex-direction: column;
      }
    }
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    > .single-pokemon-first-desc {
      > h1 {
        font-size: 40px;
      }
    }
    > .single-pokemon-second-desc {
      margin-left: 3rem;
      font-style: italic;
      font-size: 30px;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
  }
`;
