import React, { useEffect,useState, useRef } from "react";
import "./css/message.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMsgs, sendUserChat } from "../features/chats/chatsSlice";
import UserImage from "../assets/user.png";
import { useHistory } from "react-router";
import moment from "moment";

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

  const chatImageSetter = (elementIndex) => {
    const current = messages[elementIndex];
    if (elementIndex === 0) return true;
    const parentElemet = messages[elementIndex - 1];
    // console.log(current);
    if (current.sender._id === parentElemet.sender._id) {
      return false;
    } else {
      return true;
    }
  };

  const TempSendMessage = () => {
    if (textareaRef.current.value.length > 0) {
      dispatch(
        sendUserChat({
          userId: id,
          chatId: currentChatId,
          message: textareaRef.current.value,
        })
      );
      textareaRef.current.value = "";
      setTextareaValue("");
      adjustTextareaHeight();
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
                  : selectedUserDetail.participants[0]?.avatar || UserImage
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
          {messages.map((e, index) => (
            <div
              className={`chat ${e.sender._id === id ? "me" : ""} ${
                chatImageSetter(index) ? "" : "sub"
              }`}
              key={e._id}
            >
              <img src={e.sender.avatar} alt="" />
              <div className="chatWrap">
                <pre>
                  {e.content}
                  <small>{moment(e.timestamp).format("HH:MM")}</small>
                </pre>
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

          <i onClick={TempSendMessage} className="ri-send-plane-2-fill"></i>
        </div>
      </div>
    );
  }
}
