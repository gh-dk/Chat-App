import React from "react";
import "./css/chats.css";
import userImage from "../assets/user.png";

export default function UsersList({ users }) {
  return (
    <div className="chats">
      {users.map((user) => (
        <div className="chat" key={user._id}>
          <div className="userprofile">
            <img src={user.avatar || userImage} alt="User Avatar" />
            {/* <div className="online"></div> */}
          </div>
          <div className="userdetail userlist">
            <div className="chattitle">
              <h3>{user.username}</h3>
              <i className="ri-arrow-right-s-line"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
