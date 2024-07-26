import React from "react";
import "./css/chats.css";
import userImage from "../assets/user.png";

export default function userslist() {
  const msg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="chats">
      {msg.map((chat) => (
        <div className="chat">
          <div className="userprofile">
            <img src={userImage} alt="" />
            {/* <div className="online"></div> */}
          </div>
          <div className="userdetail userlist">
            <div className="chattitle">
              <h3>John {chat}</h3>
              <i className="ri-arrow-right-s-line"></i>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
