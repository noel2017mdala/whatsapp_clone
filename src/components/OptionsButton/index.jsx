import React, { useState } from "react";
import Icon from "components/Icon";
import "./styles/main.css";

const OptionsBtn = ({
  className,
  iconId,
  iconClassName,
  ariaLabel,
  options = [],
  position = "left",
  showPressed = true,
  parentState,
  ...props
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="pos-rel">
      <button
        aria-label={ariaLabel}
        className={`options-btn ${
          showOptions && showPressed ? "options-btn--pressed" : ""
        } ${className || ""}`}
        onClick={() => setShowOptions(!showOptions)}
        {...props}
      >
        <Icon id={iconId} className={iconClassName} />
      </button>
      <ul
        className={`options-btn__options ${
          showOptions ? "options-btn__options--active" : ""
        } ${position === "right" ? "options-btn__options--right" : ""}`}
      >
        {options.map((option, index) => (
          <li
            className="options-btn__option"
            key={index}
            value={option}
            onClick={(e) => {
              if (e.target.textContent === "New user") {
                // console.log(parentState.stateMethod);
                parentState.stateMethod({
                  ...parentState.state,
                  uiState: false,
                  newUserState: true,
                  groupUi: false,
                });
              } else if (e.target.textContent === "New group") {
                parentState.stateMethod({
                  ...parentState.state,
                  uiState: false,
                  newUserState: false,
                  groupUi: true,
                });
              } else if (e.target.textContent === "Profile") {
                parentState.stateMethod({
                  ...parentState.state,
                  uiState: false,
                  newUserState: false,
                  groupUi: false,
                  profileUi: true,
                });
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsBtn;
