import Icon from "components/Icon";
import React from "react";
import media from "assets/images/women.jpeg";
import formatTime from "utils/formatTime";

const Convo = ({ lastMsgRef, messages: allMessages }) => {
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

  // let getDayOfWeek = (date) => {
  //   let days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];

  // };

  return (
    <div>
      {allMessages.map((messagesData, index) => (
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
              Messages are end-to-end encrypted. No one outside of this chat,
              not even WhatsApp, can read or listen to them. Click to learn
              more.
            </p>
          )}

          <div className="chat__msg-group">
            <>
              {messagesData.attachedImage ? (
                "Image Was Attached"
              ) : messagesData.from === 1 ? (
                <p
                  className="chat__msg chat__msg--rxd"
                  ref={assignRef(index, allMessages)}
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
                    <Icon id="downArrow" className="chat__msg-options-icon" />
                  </button>
                </p>
              ) : (
                <p
                  className="chat__msg chat__msg--sent"
                  ref={assignRef(index, allMessages)}
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
                    <Icon id="downArrow" className="chat__msg-options-icon" />
                  </button>
                </p>
              )}
            </>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Convo;
