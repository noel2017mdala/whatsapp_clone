import React from "react";
import logo1 from "./icons/whatsapp2.png";
import { Header, Main } from "./styles";
import Form from "./loginForm";
import FormContainer from "./FormContainer";

const Login = () => {
  return (
    <Main>
      <Header>
        <div className="whatsapLogo">
          <img src={logo1} alt="logo" />
          <p>Whatsapp Web</p>
        </div>
      </Header>
      <FormContainer />
    </Main>
  );
};

export default Login;
