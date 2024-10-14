import React, { useEffect, createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./component/home";
import Users from "./component/users";
import Nav from "./component/nav";
import Message from "./component/message";
import Auth from "./component/auth";
import { Bigprofile } from "./component/Bigprofile";
import ProtectedRoute from "./ProtectedRoute"; // Your custom ProtectedRoute component
import "./App.css";
import { io } from "socket.io-client";

// Create a context for Socket
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export default function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3002"); // Connect to server
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected with Socket ID: ", newSocket.id);
    });

    newSocket.on("message", (message) => {
      console.log("Message from server:", message);
    });

    // Cleanup on component unmount
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <div className="viewPage">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/chats" />} />
            <ProtectedRoute path="/chats" component={Home} />
            {/* <ProtectedRoute path="/chats/:chatname" component={Home} /> */}
            <ProtectedRoute path="/people" component={Home} />
            <ProtectedRoute path="/group" component={Home} />
            <ProtectedRoute path="/users" component={Users} />
            <Route path="/auth" component={Auth} />
          </Switch>
          <Message />
          <Bigprofile />
        </div>
        <Nav />
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
