import "./css/chats.css";
import userImage from "../assets/user.png";

export default function chats() {
  const msg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="chats">
      {msg.map((chat) => (
        <div className="chat" key={chat}>
          <div className="userprofile">
            <img src={userImage} alt="" />
            <div className="online"></div>
          </div>
          <div className="userdetail">
            <div className="chattitle">
              <h3>John {chat}</h3>
              <small>10:30</small>
            </div>
            <div className="lastmessage">
              lorem lorem lorem lorem lorem lorem
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
