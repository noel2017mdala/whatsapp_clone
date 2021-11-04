import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Group = () => {
  return (
    <>
      <div className="chat">
        <div className="chat__body">
          <div className="chat__bg"></div>
        </div>
      </div>
    </>
  );
};

export default Group;
