import React, { useEffect, useId, useState } from "react";
import "./css/message.css";
import api from "../Layout/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMsgs } from "../features/chats/chatsSlice";
import UserImage from "../assets/user.png";

export default function message() {
  const { messages } = useSelector((state) => state.chats);
  const currentChatId = useSelector((state) => state.chats.currentChatId);
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("user"))?._id || "";
  // const history = useHistory();
  //log
  // console.log("chatid:" + currentChatId);
  // console.log("userId:" + id);

  //useeffect
  useEffect(() => {
    if (currentChatId) {
      dispatch(fetchChatMsgs({ userId: id, chatId: currentChatId }));
    }
  }, [currentChatId, dispatch, id]);

  if (!currentChatId) {
    return (
      <div className="messageBoxForNull">
        <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/26aa942b41f6c4959d6feb68814dd598.png?resize=1200x900&vertical=center" />
      </div>
    );
  } else {
    return (
      <div className="messageBox">
        <div className="Chatheader">
          <div className="chatDetail">
            <i
              onClick={() => {
                window.history.back();
              }}
              className="ri-arrow-left-s-line back-arrow"
            ></i>
            <img src={UserImage} />
            <span>
              <h3>Usename</h3>
              <p>
                <small>Online</small>
              </p>
            </span>
          </div>
          <i className="ri-phone-line"></i>
        </div>
        <div className="ChatUserData">
          <div className="chat">hello</div>
        </div>
        <div className="ChatInput">
          <input type="text" placeholder="Message" autoFocus/>
          <i className="ri-send-plane-2-line"></i>
        </div>
      </div>
    );
  }
}

//https://dribbble.com/shots/15343533/attachments/7103250?mode=media
