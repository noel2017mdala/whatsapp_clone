import styled from "styled-components";

const media = {
  mobile: `@media(max-width: 40em)`,
  tablet: `@media(min-width: 40em) and (max-width: 75em)`,
  bigScreen: `@media (min-width: 75em)`,
};

export const Header = styled.header`
  background-color: #00bfa5;
  width: 100vw;
  height: 35vh;

  .whatsapLogo {
    display: flex;
    text-transform: uppercase;
    color: white;
    padding: 3em 7em;
  }
  .whatsapLogo img {
    width: 2.5em;
    height: 2.5em;
  }

  .whatsapLogo p {
    padding: 0.5em 2em;
  }
`;

export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #d6dbd7;
`;
