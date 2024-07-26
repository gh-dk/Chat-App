import React, { useState } from "react";
import "./auth.css";
export default function auth() {
  const [page, setpage] = useState("login");
  return (
    <div className="auth">
      {page === "login" ? (
        <form className="form login">
          <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/26aa942b41f6c4959d6feb68814dd598.png?resize=1200x900&vertical=center" />
          <h3>Login form</h3>
          <p>lorem lorem lorem lorem</p>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
          <br />
          <p className="nextpagemsg">
            Don't have an Account ?{" "}
            <span
              onClick={() => {
                setpage("signup");
              }}
            >
              Signup
            </span>
          </p>
        </form>
      ) : (
        <form className="form login">
          <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/4a1054d82b00fd5b6544f1f3d33b3c6c.png" />
          <h3>Signup form</h3>
          <p>lorem lorem lorem lorem</p>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
          <br />
          <p className="nextpagemsg">
            Already have an Account ?{" "}
            <span
              onClick={() => {
                setpage("login");
              }}
            >
              Signup
            </span>
          </p>
        </form>
      )}
    </div>
  );
}
