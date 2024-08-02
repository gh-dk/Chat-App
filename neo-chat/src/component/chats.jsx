import "./css/chats.css";
import userImage from "../assets/user.png";
import { setBigImage } from "./Bigprofile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserChats,
  setCurrentChatId,
  setMessageselectedUserDetail,
} from "../features/chats/chatsSlice";
import moment from "moment";
import { Link, useHistory, useLocation } from "react-router-dom";
import Loading from "./loading";

export default function Chats() {
  const dispatch = useDispatch();
  const { userChats, status, error, currentChatId } = useSelector(
    (state) => state.chats
  );
  const id = JSON.parse(localStorage.getItem("user"))._id;
  const history = useHistory();
  const location = useLocation();


  const messagepage = new URLSearchParams(location.search).get("message");
  // console.log(messagepage);

  useEffect(() => {
    if (!messagepage || messagepage === "false") {
      // console.log(messagepage);
      dispatch(setCurrentChatId(null));
    }

    // console.log(messagepage);
    if (status === "idle") {
      dispatch(fetchUserChats(id));
    }
  }, [status, dispatch, id, location]);

  const handleChat_id = (chatid, chatDetail) => {
    // console.log(chatid);
    dispatch(setCurrentChatId(chatid));
    dispatch(setMessageselectedUserDetail(chatDetail));
    history.push("?message=true");
  };

  if (status === "loading") {
    return (
      <div className="statusmessage">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="statusmessage error">
        <i className="ri-error-warning-line"></i>
        <p>Unable to Connect</p>
      </div>
    );
  }
  // console.log(userChats);
  return (
    <div className="chats">
      {userChats.length > 0 ? (
        userChats.map((chat, index) => (
          <div
            className={`chat ${chat.chat_id === currentChatId ? "active" : ""}`}
            key={index}
          >
            <div className="userprofile">
              <img
                onClick={(e) => setBigImage(e.target.src)}
                src={
                  chat.typeGroup
                    ? chat.groupAvatar
                    : chat?.avatar || chat.participants[0]?.avatar || userImage
                }
                alt=""
              />
              <div className="online">{chat._id}</div>
            </div>
            <div
              className="userdetail"
              onClick={() => {
                handleChat_id(chat.chat_id, chat);
              }}
            >
              <div className="chattitle">
                <h3>
                  {chat.participants.length >= 1
                    ? chat.typeGroup
                      ? chat.groupName
                      : chat.participants[0].username || "Unknown User"
                    : "Unknown User"}
                </h3>
                <small>{moment(chat.lastmsgTime).fromNow()}</small>
              </div>
              <div className="lastmessage">{chat.lastmsg}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="no_userinChat">
          <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/4a1054d82b00fd5b6544f1f3d33b3c6c.png" />
          <h3>No Chats Yet!</h3>
          <p>
            Dive into seamless conversations and stay connected with friends and
            groups effortlessly
          </p>
          <Link to="/users">
            <small>Start Chating</small>
          </Link>
        </div>
      )}
    </div>
  );
}
