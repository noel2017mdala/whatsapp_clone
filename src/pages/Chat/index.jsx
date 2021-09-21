import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { getAllMessages } from "../../Redux/Actions/MessagesAction";

const Chat = ({ match, history }) => {
  const { users, setUserAsUnread, addNewMessage } = useUsersContext();
  const dispatch = useDispatch();
  const userId = match.params.id;

  useEffect(() => {
    // scrollToLastMsg();
    dispatch(getAllMessages(userId));
  }, [dispatch]);

  const lastMsgRef = useRef(null);
  const [showAttach, setShowAttach] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const select = useSelector((e) => {
    return e;
  });

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
    addNewMessage(
      !select
        ? null
        : !select.MessageReducer
        ? null
        : !select.MessageReducer.data
        ? null
        : !select.MessageReducer.data.user
        ? null
        : select.MessageReducer.data.user.id,
      newMessage
    );
    setNewMessage("");
    scrollToLastMsg();
  };

  // .MessageReducer.data
  return (
    <>
      <div className="chat">
        <div className="chat__body">
          <div className="chat__bg"></div>
          {!select ? null : !select.MessageReducer ? null : !select
              .MessageReducer.data ? null : !select.MessageReducer.data
              .user ? null : (
            <Header
              user={select.MessageReducer.data.user}
              openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
              openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
            />
          )}

          <div className="chat__content">
            <Convo
              messages={
                !select
                  ? null
                  : !select.MessageReducer
                  ? null
                  : !select.MessageReducer.data
                  ? null
                  : !select.MessageReducer.data.user
                  ? null
                  : select.MessageReducer.data.message
              }
              userDetails={
                !select
                  ? null
                  : !select.MessageReducer
                  ? null
                  : !select.MessageReducer.data
                  ? null
                  : !select.MessageReducer.data.user
                  ? null
                  : select.MessageReducer.data.user
              }
            />
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

          {!select ? null : !select.MessageReducer ? null : !select
              .MessageReducer.data ? null : !select.MessageReducer.data
              .user ? null : (
            <Profile
              user={select.MessageReducer.data.user}
              openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
              openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
            />
          )}
        </ChatSidebar>
      </div>
      )
    </>
  );
};

export default Chat;
