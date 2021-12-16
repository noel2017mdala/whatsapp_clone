import React from "react";
import qrCode from "./icons/qrcode.png";
import { Modal } from "./styles/Modal";
import Form from "./LoginForm";

const FormContainer = () => {
  return (
    <Modal>
      <div className="container">
        <div className="message">
          <div>
            <h1>How to Use Whatsapp-clone:</h1>
            <ul>
              <li>(1) Create an account to use Whatsapp</li>
              <li>(2) Log in to use whatsapp </li>
              <li>(3) you can scan to qrcode to login </li>
              <li>(4) Do not forget to share 😊 </li>
            </ul>
          </div>
        </div>
        <div className="image">
          <img src={qrCode} alt="scan qrCode" />
        </div>
      </div>
      <Form />
    </Modal>
  );
};

export default FormContainer;
