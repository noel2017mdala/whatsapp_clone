import React from "react";
import RenderContacts from "./renderContacts";

const Contact = ({ contact }) => {
  return <div>{contact ? <RenderContacts contact={contact} /> : null}</div>;
};
export default Contact;

/*

let newMessage = lastMessage[lastMessage.length - 1];

  // if (newMessage.to === contact.id) {
  //   console.log(newMessage);
  // }

  return (
    <div>
      {newMessage.to === contact.id ? (
        <RenderContacts contact={contact} lastMessage={lastMessage} />
      ) : null}
    </div>
  );

  && e.to === contact.id
*/
