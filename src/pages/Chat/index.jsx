import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./styles/main.css";
import EmojiTray from "./components/EmojiTray";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Icon from "components/Icon";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Convo from "./components/Convo";
import { useUsersContext } from "context/usersContext";

const Chat = ({ match, history }) => {
  const { users, setUserAsUnread, addNewMessage } = useUsersContext();

  const userId = match.params.id;

  const select = useSelector((e) => {
    return e;
  });

  const lastMsgRef = useRef(null);
  const [showAttach, setShowAttach] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  let user = select.fetchContactList.data.filter(
    (user) => user.id === userId
  )[0];

  useEffect(() => {
    if (!user) {
      history.push("/");
    } else {
      // scrollToLastMsg();
      // setUserAsUnread(user.id);
    }
  }, []);

  const openSidebar = (cb) => {
    // close any open sidebar first
    setShowProfileSidebar(false);
    setShowSearchSidebar(false);

    // call callback fn
    cb(true);
  };

  const scrollToLastMsg = () => {
    lastMsgRef.current.scrollIntoView();
  };

  return (
    <div className="chat">
      <div className="chat__body">
        <div className="chat__bg"></div>
        <Header
          user={user}
          openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
          openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
        />
      </div>
    </div>
  );
};

export default Chat;
