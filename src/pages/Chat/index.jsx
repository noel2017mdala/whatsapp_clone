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

  let user = !select.fetchContactList
    ? console.log("not done loading")
    : false
    ? false
    : select;

  // if (!select) {
  //   console.log("Loading");
  // } else if (!select.fetchContactList) {
  //   console.log("Still Loading");
  // } else if (!select.fetchContactList.data) {
  //   console.log("Not yet done");
  // } else {
  //   console.log(select.fetchContactList.data);
  // }

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

  const submitNewMessage = () => {
    addNewMessage(user.id, newMessage);
    setNewMessage("");
    scrollToLastMsg();
  };

  return (
    <div className="chat">
      <div className="chat__body">
        <div className="chat__bg"></div>
        {!user ? null : !user.fetchContactList ? null : !user.fetchContactList
            .data ? null : (
          <Header
            user={
              user.fetchContactList.data.filter((user) => {
                if (user) {
                  return user.id === userId;
                }
              })[0]
            }
            openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
            openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
          />
        )}
        <div className="chat__content">
          <Convo lastMsgRef={lastMsgRef} messages={user.MessageReducer.data} />
        </div>
        <footer className="chat__footer">
          <button
            className="chat__scroll-btn"
            aria-label="scroll down"
            onClick={scrollToLastMsg}
          >
            <Icon id="downArrow" />
          </button>
          <EmojiTray
            showEmojis={showEmojis}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
          <ChatInput
            showEmojis={showEmojis}
            setShowEmojis={setShowEmojis}
            showAttach={showAttach}
            setShowAttach={setShowAttach}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            submitNewMessage={submitNewMessage}
          />
        </footer>
      </div>
      <ChatSidebar
        heading="Search Messages"
        active={showSearchSidebar}
        closeSidebar={() => setShowSearchSidebar(false)}
      >
        <Search />
      </ChatSidebar>

      <ChatSidebar
        heading="Contact Info"
        active={showProfileSidebar}
        closeSidebar={() => setShowProfileSidebar(false)}
      >
        {/* <Profile
          user={
            !select.fetchContactList
              ? null
              : !select.fetchContactList.data
              ? null
              : select.fetchContactList.data.filter((user) => {
                  return user.id === userId;
                })[0]
          }
          history={history}
        /> */}

        {!user ? null : !user.fetchContactList ? null : !user.fetchContactList
            .data ? null : (
          <Profile
            user={
              user.fetchContactList.data.filter((user) => {
                if (user) {
                  return user.id === userId;
                }
              })[0]
            }
            openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
            openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
          />
        )}
      </ChatSidebar>
    </div>
  );
};

export default Chat;
