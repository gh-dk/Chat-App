import React, { useEffect, useId, useState, useRef } from "react";
import "./css/message.css";
import api from "../Layout/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMsgs } from "../features/chats/chatsSlice";
import UserImage from "../assets/user.png";
import { useHistory } from "react-router";

export default function message() {
  const { messages, selectedUserDetail } = useSelector((state) => state.chats);
  const currentChatId = useSelector((state) => state.chats.currentChatId);
  const dispatch = useDispatch();
  const history = useHistory();
  const id = JSON.parse(localStorage.getItem("user"))?._id || "";

  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "45px";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 100) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [textareaValue]);

  useEffect(() => {
    if (currentChatId) {
      dispatch(fetchChatMsgs({ userId: id, chatId: currentChatId }));
    }
  }, [currentChatId, dispatch, id]);

  useEffect(() => {
    console.log("messages");
    console.log(messages);
    console.log(selectedUserDetail);
    return () => {};
  }, [messages, selectedUserDetail]);

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
                history.push("?message=false");
              }}
              className="ri-arrow-left-s-line back-arrow"
            ></i>
            <img
              src={
                selectedUserDetail.typeGroup
                  ? selectedUserDetail.groupAvatar
                  : selectedUserDetail.participants[0].avatar
              }
            />
            <span>
              <h3>
                {selectedUserDetail.typeGroup
                  ? selectedUserDetail.groupName
                  : selectedUserDetail.participants[0].username}
              </h3>
              <p>
                <small>Online</small>
              </p>
            </span>
          </div>
          <i className="ri-phone-line extra"></i>
        </div>
        <div className="ChatUserData">
          {messages.map((e) => (
            <div
              className={`chat ${e.sender._id === id ? "me" : ""}`}
              key={e._id}
            >
              <img src={e.sender.avatar} alt="" />
              <div className="chatWrap">
                <pre>{e.content}</pre>
                <small>10:10</small>
              </div>
            </div>
          ))}
        </div>
        <div className="ChatInput">
          <i className="ri-attachment-line extra"></i>

          <textarea
            ref={textareaRef}
            value={textareaValue}
            onChange={handleTextareaChange}
            placeholder="Message"
          ></textarea>

          <i className="ri-send-plane-2-fill"></i>
        </div>
      </div>
    );
  }
}

//https://dribbble.com/shots/15343533/attachments/7103250?mode=media
