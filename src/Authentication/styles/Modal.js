import styled from "styled-components";
const media = {
  mobile: `@media(max-width: 40em)`,
  tablet: `@media(min-width: 40em) and (max-width: 75em)`,
  bigScreen: `@media (min-width: 75em)`,
};

export const Modal = styled.div`
  background-color: #ffffff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  width: 70%;
  display: block;
  margin 0 auto;
  height: 90vh;
  border-radius: .2em;
  position: relative;
  bottom: 7em;

  .container{
      display: flex;
      flex-direction: row;
      padding-top: 2em;
  }

  .message{
      flex-grow: 1;
  }

  .message div{
      padding: 2em 1.5em;
  }

  div h1{
      text-transform: capitalize;
  }
  div ul{
      list-style: none;
  }
  ul li{
      margin: 2em 0em;
  }

  .info{
      text-align: center;
      padding: 2em;
      font-size: 1em;
      font-weight: bold;
  }

  .image{
    flex-grow: 2;
}
.image img {
    width: 70%;
    display: block;
    margin: 0 auto;

}
`;
