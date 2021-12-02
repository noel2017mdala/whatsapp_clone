import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmojiTray from "./components/EmojiTray";
import ChatInput from "./components/ChatInput";
import ChatSidebar from "./components/ChatSidebar";
import Search from "./components/Search";
import socket from "../../socket";
import Icon from "components/Icon";
import Convo from "./components/Convo";
import GroupDetails from "./components/GroupProfile";
import { useParams } from "react-router-dom";
import GroupHeader from "./components/GroupHeader";
import { getUserDAta } from "../../utils/userData";
import { getGroupData, getGroupMessages } from "Redux/Actions/groupAction";

const Group = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const lastMsgRef = useRef(null);
  const [showAttach, setShowAttach] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    dispatch(getGroupData(id));
    dispatch(getGroupMessages(id));
  }, []);

  const select = useSelector((e) => {
    return e;
  });

  const scrollToLast = () => {
    messageEndRef.current?.scrollIntoView();
  };

  const openSidebar = (cb) => {
    // close any open sidebar first
    setShowProfileSidebar(false);
    setShowSearchSidebar(false);
    cb(true);
  };

  const submitNewMessage = () => {
    let senderId = getUserDAta()._id;

    let messageContent = {
      from: senderId,
      to: id,
      messagesBody: newMessage,
      groupId: id,
    };

    //send a group Message

    socket.emit("group-message", messageContent);
    setNewMessage("");
  };

  return (
    <>
      <div className="chat">
        <div className="chat__body">
          <div className="chat__bg"></div>
          <GroupHeader
            userDetails={select.groupData}
            openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
            openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
          />
          <div className="chat__content">
            {/* <Convo
              messages={
                !select
                  ? null
                  : !select.groupMessages
                  ? null
                  : !select.groupMessagesr.data
                  ? null
                  : !select.groupMessages.data.user
                  ? null
                  : select.groupMessages.data
              }
              scrollFunction={scrollToLast}
              messageEndRef={messageEndRef}
            /> */}

            <Convo
              messages={
                !select
                  ? null
                  : !select.groupMessages
                  ? null
                  : select.groupMessages.data
              }
              scrollFunction={scrollToLast}
              messageEndRef={messageEndRef}
            />
          </div>

          <footer className="chat__footer">
            <button
              className="chat__scroll-btn"
              aria-label="scroll down"
              onClick={scrollToLast}
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
          heading="Group Info"
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

          {!select ? null : !select.groupData ? null : (
            <GroupDetails
              group={select.groupData}
              openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
              openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
            />
          )}
        </ChatSidebar>
      </div>
    </>
  );
};

export default Group;
