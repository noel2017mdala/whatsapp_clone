import Icon from "components/Icon";
import React, { useEffect, useRef, useState } from "react";
import Cookie from "universal-cookie";
import { Link } from "react-router-dom";
import media from "assets/images/women.jpeg";
import formatTime from "utils/formatTime";

const Convo = ({ lastMsgRef, messages, messageEndRef, scrollFunction }) => {
  let cookie = new Cookie();
  let userData = cookie.get("userData");
  const assignRef = (parm1, parm2) => {
    return parm1 === parm2 - 1 ? lastMsgRef : undefined;
  };
  let holdValue = "";
  let checkDate = (currentDate) => {
    if (currentDate === holdValue) {
      return true;
    } else {
      holdValue = currentDate;
      return false;
    }
  };

  let getToday = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    if (month < 10) {
      return `0${month + 1}/${day}/${year.toString().substr(-2)}`;
    } else {
      return `${month + 1}/${day}/${year.toString().substr(-2)}`;
    }
  };

  useEffect(() => {
    scrollFunction();
  }, [messages]);

  return (
    <div>
      {!messages ? null : messages.length < 1 ? (
        <>
          <div className="chat__date-wrapper">
            <span className="chat__date">TODAY</span>
          </div>

          <p className="chat__encryption-msg">
            <Icon id="lock" className="chat__encryption-icon" />
            Messages are end-to-end encrypted. No one outside of this chat, not
            even WhatsApp, can read or listen to them. Click to learn more.
          </p>
        </>
      ) : (
        messages.map((messagesData, index) =>
          !messagesData.from._id ? (
            <div key={index}>
              <div className="chat__date-wrapper">
                {checkDate(messagesData.dateSent) ? null : getToday() ===
                  holdValue ? (
                  <span className="chat__date">TODAY</span>
                ) : (
                  <span className="chat__date"> {holdValue}</span>
                )}
              </div>

              {index === 0 && (
                <p className="chat__encryption-msg">
                  <Icon id="lock" className="chat__encryption-icon" />
                  Messages are end-to-end encrypted. No one outside of this
                  chat, not even WhatsApp, can read or listen to them. Click to
                  learn more.
                </p>
              )}

              <div className="chat__msg-group">
                <>
                  {messagesData.attachedImage ? (
                    "Image Was Attached"
                  ) : messagesData.from !== userData._id ? (
                    <p
                      className="chat__msg chat__msg--rxd"
                      ref={assignRef(index, messages)}
                    >
                      <span>{messagesData.messagesBody}</span>
                      <span className="chat__msg-filler"> </span>
                      <span className="chat__msg-footer">
                        {formatTime(messagesData.timeSent)}
                      </span>
                      <button
                        aria-label="Message options"
                        className="chat__msg-options"
                      >
                        <Icon
                          id="downArrow"
                          className="chat__msg-options-icon"
                        />
                      </button>
                    </p>
                  ) : (
                    <p
                      className="chat__msg chat__msg--sent"
                      ref={assignRef(index, messages)}
                    >
                      <span>{messagesData.messagesBody}</span>
                      <span className="chat__msg-filler"> </span>
                      <span className="chat__msg-footer">
                        <span> {formatTime(messagesData.timeSent)} </span>
                        <Icon
                          id={
                            messagesData?.messageStatus === "sent"
                              ? "singleTick"
                              : "doubleTick"
                          }
                          aria-label={messagesData?.messageStatus}
                          className={`chat__msg-status-icon ${
                            messagesData?.messageStatus === "read"
                              ? "chat__msg-status-icon--blue"
                              : ""
                          }`}
                        />
                      </span>
                      <button
                        aria-label="Message options"
                        className="chat__msg-options"
                      >
                        <Icon
                          id="downArrow"
                          className="chat__msg-options-icon"
                        />
                      </button>
                    </p>
                  )}
                </>
              </div>
            </div>
          ) : (
            <div key={index}>
              <div className="chat__date-wrapper">
                {checkDate(messagesData.dateSent) ? null : getToday() ===
                  holdValue ? (
                  <span className="chat__date">TODAY</span>
                ) : (
                  <span className="chat__date"> {holdValue}</span>
                )}
              </div>
              {index === 0 && (
                <p className="chat__encryption-msg">
                  <Icon id="lock" className="chat__encryption-icon" />
                  Messages are end-to-end encrypted. No one outside of this
                  chat, not even WhatsApp, can read or listen to them. Click to
                  learn more.
                </p>
              )}

              <div className="chat__msg-group">
                <>
                  {messagesData.attachedImage ? (
                    "Image Was Attached"
                  ) : messagesData.from._id !== userData._id ? (
                    <>
                      <div
                        className="group_chat_message chat__msg--rxd"
                        ref={assignRef(index, messages)}
                      >
                        <p className="user-details">
                          <Link to={`/chat/${messagesData.from._id}`}>
                            {messagesData.from.name}
                          </Link>
                        </p>

                        <span className="message_body">
                          {messagesData.messagesBody}
                        </span>
                        <span className="chat__msg-filler"> </span>
                        <span className="chat__msg-footer">
                          {formatTime(messagesData.timeSent)}
                        </span>
                        <button
                          aria-label="Message options"
                          className="chat__msg-options"
                        >
                          <Icon
                            id="downArrow"
                            className="chat__msg-options-icon"
                          />
                        </button>
                      </div>
                    </>
                  ) : (
                    <p
                      className="chat__msg chat__msg--sent"
                      ref={assignRef(index, messages)}
                    >
                      <span>{messagesData.messagesBody}</span>
                      <span className="chat__msg-filler"> </span>
                      <span className="chat__msg-footer">
                        <span> {formatTime(messagesData.timeSent)} </span>
                        <Icon
                          id={
                            messagesData?.messageStatus === "sent"
                              ? "singleTick"
                              : "doubleTick"
                          }
                          aria-label={messagesData?.messageStatus}
                          className={`chat__msg-status-icon ${
                            messagesData?.messageStatus === "read"
                              ? "chat__msg-status-icon--blue"
                              : ""
                          }`}
                        />
                      </span>
                      <button
                        aria-label="Message options"
                        className="chat__msg-options"
                      >
                        <Icon
                          id="downArrow"
                          className="chat__msg-options-icon"
                        />
                      </button>
                    </p>
                  )}
                </>
              </div>
            </div>
          )
        )
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default Convo;
