import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Contact from "./Contact";
import { getLastMessage } from "../../Redux/Actions/MessagesAction";

const GetContact = ({ contact, index, lastMessage }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      dispatch(getLastMessage(contact.id));
    }
  }, [dispatch]);

  const select = useSelector((e, index) => {
    return e.MessageReducer;
  });

  // const getLastMessage = () => {
  //   if (select) {
  //     console.log(select);
  //   }
  // };

  return <div>{contact ? <Contact contact={contact} /> : ""}</div>;
};

export default GetContact;
