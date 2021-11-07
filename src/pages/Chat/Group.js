import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmojiTray from "./components/EmojiTray";
import ChatInput from "./components/ChatInput";
import ChatSidebar from "./components/ChatSidebar";
import Search from "./components/Search";
import Icon from "components/Icon";
import { useParams } from "react-router-dom";
import GroupHeader from "./components/GroupHader";
import { getGroupData } from "Redux/Actions/groupAction";

const Group = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const lastMsgRef = useRef(null);
  const [showAttach, setShowAttach] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    dispatch(getGroupData(id));
  }, []);

  const select = useSelector((e) => {
    return e;
  });

  // console.log(select.groupData);

  const scrollToLast = () => {
    // messageEndRef.current?.scrollIntoView();
    console.log("header bottom");
  };

  const submitNewMessage = () => {
    // let messageContent = {
    //   from: userData._id,
    //   to: id,
    //   messagesBody: newMessage,
    // };

    // socket.emit("message-sent", messageContent, {
    //   userData,
    //   userId,
    // });

    // setNewMessage("");

    console.log("about to submit group message");
  };

  return (
    <>
      <div className="chat">
        <div className="chat__body">
          <div className="chat__bg"></div>
          <GroupHeader userDetails={select.groupData} />
          <div className="chat__content">
            {/* <Convo
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
              scrollFunction={scrollToLast}
              messageEndRef={messageEndRef}
            /> */}
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

          {/* {!select ? null : !select.MessageReducer ? null : !select
              .MessageReducer.data ? null : !select.MessageReducer.data
              .user ? null : (
            <Profile
              user={select.MessageReducer.data.user}
              openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
              openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
            />
          )} */}
        </ChatSidebar>
      </div>
    </>
  );
};

export default Group;
